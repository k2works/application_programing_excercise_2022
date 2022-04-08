# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %%
from IPython import get_ipython

# %% [markdown]
# # Pandas基本操作
# %% [markdown]
# ## Pythonのバージョン確認、モジュールのimport、データの読み込み

# %%
get_ipython().system('python -V')


# %%
import pandas as pd
import matplotlib.pyplot as plt
import japanize_matplotlib


# %%
df = pd.read_csv('./data/lunch_box.csv', sep=',')


# %%
df.head(3)


# %%
df.head()


# %%
df.tail()

# %% [markdown]
# ## 簡単にデータの状態を確認する

# %%
print('dataframeの行数・列数の確認==>\n', df.shape)
print('indexの確認==>\n', df.index)
print('columnの確認==>\n', df.columns)
print('dataframeの各列のデータ型を確認==>\n', df.dtypes)


# %%
df[['name','kcal']]


# %%
df[100:106]


# %%
df.loc[100]


# %%
df.iloc[[1,2,4],[0,2]]


# %%
df[['name','kcal']].query('kcal > 450 and name == "豚肉の生姜焼"')


# %%
df['remarks'].unique()


# %%
len(df) == len(df['datetime'].unique())


# %%
df.drop_duplicates()
df.shape


# %%
df.describe()

# %% [markdown]
# ## データの整形

# %%
df.set_index('datetime', inplace=True)
df.head()


# %%
df.index


# %%
df.rename(columns={'y':'sales'}, inplace=True)
df.head()


# %%
df.sort_values(by="sales", ascending=True).head()


# %%
df.sort_values(['sales', 'temperature'], ascending=False).head()


# %%
df.index


# %%
df.index = pd.to_datetime(df.index, format='%Y-%m-%d')


# %%
df.index


# %%
df.sort_index().head()


# %%
df.resample('M').mean()


# %%
df['month'] = list(pd.Series(df.index).apply(lambda x: x.month))
df['day'] = list(pd.Series(df.index).apply(lambda x: x.day))

df.head()


# %%
labels = ['上旬', '中旬', '下旬']
df['period'] = pd.cut(list(df['day']),  bins=[0,10,20,31], labels=labels, right=True) # 0<day≦10, 10<day≦20, 20<day≦31

df.head()

# %% [markdown]
# ## データの欠損状態の確認

# %%
df.isnull().sum()


# %%
print(df[df.isnull().any(axis=1)].shape)
df[df.isnull().any(axis=1)].head()

# %% [markdown]
# ## 値(欠損)の置き換えや削除

# %%
df.fillna(value={'payday': 0.0},inplace=True)
df.head()


# %%
df.isnull().sum()


# %%
df.dropna(subset=['kcal'], axis=0, inplace=True)
df.shape


# %%
df.isnull().sum()


# %%
df['precipitation'] = df['precipitation'].str.replace('--', '0').astype(float)
df.head()


# %%
pd.DataFrame(df['sales'].mask(df['sales'] > 80, 100)).head()


# %%
df.drop(['remarks'], axis=1, inplace=True)
df.head()

# %% [markdown]
# ## 集計

# %%
df['weather'].value_counts()


# %%
df.groupby(['week'])['soldout'].count()


# %%
df.groupby(['month', 'period'])['sales'].sum()


# %%
df.groupby(['weather'])['temperature'].mean()


# %%
df['temperature_diff'] = df['temperature'].diff(periods=1)
df[['temperature', 'temperature_diff']].head()


# %%
df['temperature_rolling_mean'] = df['temperature'].rolling(window=3).mean()
df[['temperature', 'temperature_diff', 'temperature_rolling_mean']].head()


# %%
df['temperature_pct_change'] = df['temperature'].pct_change()
df[['temperature', 'temperature_diff', 'temperature_rolling_mean', 'temperature_pct_change']].head()


# %%
df.dropna(subset=['temperature_diff', 'temperature_rolling_mean', 'temperature_pct_change'], axis=0, inplace=True)


# %%
df.isnull().sum()


# %%
df.head()

# %% [markdown]
# ## 可視化

# %%
get_ipython().run_line_magic('matplotlib', 'inline')
import matplotlib.pyplot as plt

plt.style.use('ggplot')


# %%
df['sales'].plot()


# %%
df.plot(y=['temperature', 'temperature_rolling_mean', 'temperature_pct_change'],  figsize=(16,4), alpha=0.5)
plt.title('気温変化に関する図')


# %%
df.plot(kind='hist', y='sales', bins=10, figsize=(16,4), alpha=0.5)


# %%
df.plot(kind='scatter', x='kcal', y='sales')


# %%
df[['kcal', 'sales']].corr()


# %%
monthly_df = pd.DataFrame(df.groupby(['month', 'period'])['sales'].sum())
pivot_monthly_df = monthly_df.reset_index().pivot(index='month', columns='period', values='sales')
pivot_monthly_df


# %%
pivot_monthly_df.plot(kind='bar', alpha=0.6, figsize=(12,3))
plt.title('月別・期間別の売上個数')

# %% [markdown]
# ## 変数の前処理

# %%
print(df.columns)
len(df.columns)


# %%
dummy_df = pd.get_dummies(df, columns=['week', 'name', 'event', 'weather', 'period'])
dummy_df.head()


# %%
pd.set_option('display.max_columns', 160)


# %%
print(dummy_df.shape)
dummy_df.head()

# %% [markdown]
# ## 最後に、出来たデータをもう一度眺める

# %%
print(dummy_df.isnull().sum())
dummy_df.head()

# %% [markdown]
# ## 参照
# 
# - [データ分析で頻出のPandas基本操作
# ](https://qiita.com/ysdyt/items/9ccca82fc5b504e7913a)

