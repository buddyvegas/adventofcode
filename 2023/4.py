import math

total = 0
winning_numbers = []
hand_numbers = []

with open("4-test.in", "r") as input:
    for line in input.read().splitlines():
        numbers = line.split(":")[1].split('|')
        winning_numbers.append(numbers[0].split())
        hand_numbers.append(numbers[1].split())

for index in range(len(hand_numbers)):
    pow_score = -1
    for hand_number in hand_numbers[index]:
        if hand_number in winning_numbers[index]:
            pow_score += 1
    
    if (pow_score >= 0):
        total += math.pow(2, pow_score)

print(int(total))