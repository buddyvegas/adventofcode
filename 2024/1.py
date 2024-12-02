left_list = []
right_list = []

with open('1.in', 'r') as input:
    for line in input.read().splitlines():
        left, right = line.split()
        left_list.append(int(left))
        right_list.append(int(right))

left_list.sort()
right_list.sort()

total = 0;

for index, _ in enumerate(left_list):
    total += abs(left_list[index] - right_list[index])

print(total)