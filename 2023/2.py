max_red = 12
max_green = 13
max_blue = 14

# max_colors = {
#     "red": 12,
#     "green": 13,
#     "blue": 14
# }

# def verify_tirage(data):
#     number = int(data[0])
#     color = data[1]
#     return number <= max_colors[color]

def get_max(tirages):
    max_colors = {
        "red": 0,
        "green": 0,
        "blue": 0
    }
    
    for tirage in tirages:
        cubes = tirage.split(',')

        for cube in cubes:
            data = cube.split()
            number = int(data[0])
            color = data[1]
            
            if (max_colors[color] < number):
                max_colors[color] = number
                
    return max_colors


total = 0
with open('2.in', 'r') as input:
    for line in input.read().splitlines():
        game = line.split(':')
        gameId = game[0].split()[1]
        tirages = game[1].split(';')
        
        max_colors = get_max(tirages)
        power = max_colors["red"] * max_colors["green"] * max_colors["blue"]
        total += power
        
        # isGameValid = True
        # for tirage in tirages:
        #     cubes = tirage.split(',')

        #     for cube in cubes:
        #         data = cube.split()

                # if verify_tirage(data) == False:
                #     isGameValid = False
                #     break
                
        # if (isGameValid):
        #     total += int(gameId)

print(total)
                
