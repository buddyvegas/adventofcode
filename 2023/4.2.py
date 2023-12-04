import math

total = 0
winning_numbers = []
hand_numbers = []
card_numbers = []

with open("4.in", "r") as input:
    for line in input.read().splitlines():
        numbers = line.split(":")[1].split('|')
        winning_numbers.append(numbers[0].split())
        hand_numbers.append(numbers[1].split())
        card_numbers.append(1)

for index in range(len(hand_numbers)):
    add_cards_index = index
    for hand_number in hand_numbers[index]:
        
        if hand_number in winning_numbers[index]:
            add_cards_index += 1
            if (add_cards_index < len(card_numbers)):
                card_numbers[add_cards_index] += card_numbers[index]

print(sum(card_numbers))