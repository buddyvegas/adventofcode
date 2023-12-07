from enum import Enum
from collections import Counter

JOKER = "J"

card_value = "AKQT98765432J"
card_equivalent = "ABCDEFGHIJKLM"

forward_mapping_cards = {}
backward_mapping_cards = {}

for card in card_value:
    forward_mapping_cards[card] = card_equivalent[card_value.index(card)]
    backward_mapping_cards[card_equivalent[card_value.index(card)]] = card

class HandType(Enum):
    FiveOfAKind = 7
    FourOfAKind = 6
    FullHouse = 5
    ThreeOfAKind = 4
    TwoPair = 3
    OnePair = 2
    HighCard = 1
    
hands = {
  HandType.FiveOfAKind: [],
  HandType.FourOfAKind: [],
  HandType.FullHouse: [],
  HandType.ThreeOfAKind: [],
  HandType.TwoPair: [],
  HandType.OnePair: [],
  HandType.HighCard: []
}

def get_hand_type(hand: str):
    number_of_jokers = hand.count(JOKER)

    if (number_of_jokers == 5):
        return HandType.FiveOfAKind        

    hand_without_joker = hand.replace(JOKER, "")

    counter = Counter(hand_without_joker)
    count_by_card = sorted([counter[key] for key in counter], reverse=True)    
    count_by_card[0] += number_of_jokers

    if count_by_card[0] == 5:
        return HandType.FiveOfAKind
    elif count_by_card[0] == 4:
        return HandType.FourOfAKind
    elif count_by_card[0] == 3 and count_by_card[1] == 2:
        return HandType.FullHouse
    elif count_by_card[0] == 3:
        return HandType.ThreeOfAKind
    elif count_by_card[0] == 2 and count_by_card[1] == 2:
        return HandType.TwoPair
    elif count_by_card[0] == 2:
        return HandType.OnePair
    else:
        return HandType.HighCard
    
def order_hand_type(hands):
    if (len(hands) == 0):
        return hands
    
    ordered_hand = []
    temp_hand = []
    for hand in hands:
      temp_hand.append((hand[0].translate(str.maketrans(forward_mapping_cards)), hand[1]))

    for temp in sorted(temp_hand, key=lambda x: (x[0], x[1])):
      ordered_hand.append((temp[0].translate(str.maketrans(backward_mapping_cards)), temp[1]))

    return ordered_hand

with open('7.in', 'r') as input:
    for line in input.read().splitlines():
        splitted = line.split()
        hands[get_hand_type(splitted[0])].append((splitted[0], int(splitted[1])))

ordered_hands = []
for hand_type in hands:
    ordered_hands.extend([*order_hand_type(hands[hand_type])])

result = 0
for index, hand in enumerate(ordered_hands):
    result += hand[1] * (len(ordered_hands) - index)

print(result)