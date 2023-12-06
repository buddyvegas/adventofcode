import math

time = 0
distance = 0

with open('6.in', 'r') as input:
    for line in input.read().splitlines():
        if ("Time" in line): time = int(line.split(':')[1].replace(" ", ""))
        if ("Distance" in line): distance = int(line.split(':')[1].replace(" ", ""))

# for index, time in enumerate(times):
win_push = 0
for push_time in range(1, time - 1):
  if time - push_time > distance / push_time: win_push += 1

print(win_push)