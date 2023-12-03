import re

spelledNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

def spelledToNumber(spelled):
    try:
        return str(spelledNumbers.index(spelled)+1)
    except ValueError:
        return spelled    

total = 0
with open('1.in', 'r') as input:
    for line in input.read().splitlines():
        numbers = re.findall(r'(?=(\d|one|two|three|four|five|six|seven|eight|nine))', line)
        calibration = spelledToNumber(numbers[0]) + spelledToNumber(numbers[-1])
        total += int(calibration)

print(total)
