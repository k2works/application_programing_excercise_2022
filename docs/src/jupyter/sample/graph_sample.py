# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %%
from IPython import get_ipython

# %% [markdown]
# # グラフを表示する 
# %% [markdown]
# ## 前準備

# %%
get_ipython().run_line_magic('matplotlib', 'inline')
import pandas as pd
import matplotlib.pyplot as plt
df = pd.read_csv("sample-data-1.csv", names=["id", "target", "data1", "data2", "data3"])


# %%
df

# %% [markdown]
# ## ヒストグラム

# %%
plt.hist(df["data1"])


# %%
plt.hist(df["data1"], bins=30)


# %%
plt.hist(df["data1"], range=(-100, 100))


# %%
plt.hist(df["data1"], density=True)

# %% [markdown]
# ## 散布図

# %%
plt.scatter(df["data1"], df["data2"])


# %%
plt.scatter(df["data1"], df["data2"], c = df["target"])


# %%
plt.scatter(df["data1"], df["data2"], c = df["target"], alpha=0.5)


# %%
plt.xlim(-50, 50)
plt.ylim(-5, 5)
plt.scatter(df["data1"], df["data2"], c = df["target"])

# %% [markdown]
# ## 前準備

# %%
import pandas as pd
pd.read_csv("population.csv", encoding="SHIFT_JIS")


# %%
import pandas as pd
df = pd.read_csv("population.csv", encoding="SHIFT_JIS")
df.sort_values(by=["平成28年"], ascending=True)


# %%
import matplotlib as mpl
mpl.__path__


# %%
import matplotlib.pyplot as plt
import japanize_matplotlib

plt.plot([1, 2, 3, 4])
plt.xlabel('日本語を簡単に使える喜び')
plt.show()

# %% [markdown]
# ## 棒グラフ

# %%
get_ipython().run_line_magic('matplotlib', 'inline')
import pandas as pd
df = pd.read_csv("population.csv", encoding="SHIFT_JIS")
df.plot.bar(y=['平成28年'])


# %%
import pandas as pd
df = pd.read_csv("population.csv", encoding="SHIFT_JIS")
df["平成28年"]


# %%
import pandas as pd
df = pd.read_csv("population.csv", encoding="SHIFT_JIS")
df["平成28年"] - df["平成12年"]


# %%
get_ipython().run_line_magic('matplotlib', 'inline')
import pandas as pd
df = pd.read_csv("population.csv", encoding="SHIFT_JIS")
# 増減を調べる --- (*1)
df['増減'] = df["平成28年"] - df["平成12年"]
# 並び替え --- (*2)
df = df.sort_values(by=["増減"], ascending=False)
# 上位10位を得る --- (*3)
top10 = df[0:10]
# グラフで描画 --- (*4)
top10.plot.bar(y=["増減"], x="都道府県")
top10


# %%
get_ipython().run_line_magic('matplotlib', 'inline')
import pandas as pd

df = pd.read_csv("population.csv", encoding="SHIFT_JIS")
# 増減を調べて並び替える
df['増減'] = df["平成28年"] - df["平成12年"]
df = df.sort_values(by=["増減"], ascending=False)
# プラスとマイナスの中間を抜き出す --- (*1)
mid = df[5:15]

# グラフのスタイルに ggplot を利用する --- (*2)
import matplotlib
matplotlib.style.use('ggplot')
# グラフ描画
plt = mid.plot.bar(y=["増減"], x="都道府県")
# 0のラインを強調 --- (*3)
plt.axhline(0, color='k')

# %% [markdown]
# ## 円グラフ

# %%
get_ipython().run_line_magic('matplotlib', 'inline')
import pandas as pd
import matplotlib
matplotlib.style.use('ggplot')

df = pd.read_csv("population.csv", encoding="SHIFT_JIS")
# 増減を調べ増加順に並び替える
df['増減'] = df["平成28年"] - df["平成27年"]
df = df.sort_values(by=["増減"], ascending=False)
# 上位5位を抽出
top = df[0:5]
# 円グラフで描画 --- (*1)
top["増減"].plot.pie(labels=top["都道府県"], autopct='%.0f')

# %% [markdown]
# ## 参照
# 
# - [ヒストグラム・散布図をJupyter Notebook上で表示する](https://qiita.com/suzuki-navi/items/9f5fd47734b22b4adf71)
# - [JupyterでCSVファイルを視覚化してみよう](https://news.mynavi.jp/article/zeropython-3/)
# - [Jupyterでいろいろなグラフを描画しよう](https://news.mynavi.jp/article/zeropython-4/)

# %%



