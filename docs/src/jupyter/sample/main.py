# To add a new cell, type '#%%'
# To add a new markdown cell, type '#%% [markdown]'
# %% Change working directory from the workspace root to the ipynb file location. Turn this addition off with the DataScience.changeDirOnImportExport setting
# ms-python.python added
import unittest
import doctest
import os
try:
    os.chdir(os.path.join(os.getcwd(), ''))
    print(os.getcwd())
except:
    pass
# %% [markdown]
# # タイトル
#
# ## 前提
#
# ## 参照
#

# %%
# Doctest


def add(a, b):
    """Return the sum of a and b.

    >>> add(2, 2)
    4
    """
    sum = a
    return sum


doctest.testmod(verbose=True)

# %%
# Unittest


class TestFunction(unittest.TestCase):
    def setUp(self):
        return super().setUp()

    def tearDown(self):
        return super().tearDown()

    def test_add(self):
        self.assertEquals(add(2, 2), 5)


unittest.main(argv=[''], verbosity=2, exit=False)
