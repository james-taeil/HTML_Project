# from pandas import DataFrame, Series

# row = {'col1':[1,2,3,4],
#        'col2':[3,4,5,6],
#        'col3':[7,8,9,10]
# }
# data = DataFrame(row)
# print(data)

# print(type(data['col1']))

import pandas_datareader.data as web
import datetime

start = datetime.datetime(2020, 8, 1)
end = datetime.datetime(2020, 8, 20)
gs = web.DataReader('078930.KS', 'yahoo', start, end)

import matplotlib.pyplot as plt
plt.plot(gs['Close'])
