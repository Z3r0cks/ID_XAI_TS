import random

def initialize_board():
    return [0] * 9

# def print_board(board):
#     for i in range(0, 9, 3):
#         print(board[i:i+3])

def check_winner(row):
    try:
        board = [row[0:3], row[3:6], row[6:9]]

        for i in range(3):
            if board[i][0] != 0 and board[i][0] == board[i][1] == board[i][2]:
                return board[i][0]

        for j in range(3):
            if board[0][j] != 0 and board[0][j] == board[1][j] == board[2][j]:
                return board[0][j]

        if board[0][0] != 0 and board[0][0] == board[1][1] == board[2][2]:
            return board[0][0]

        if board[0][2] != 0 and board[0][2] == board[1][1] == board[2][0]:
            return board[0][2]

        return 0

    except IndexError as e:
        print("Fehler beim Überprüfen des Gewinners:", e)
        print("Aktuelle Reihe:", row)
        print("Aktuelles Board:", board)
        raise e

def is_board_full(board):
    return all(cell != 0 for cell in board)

def play_game():
    board = initialize_board()
    current_player = 1

    while True:
        # print("___")
        # print_board(board)

        if random.random() < 0.01:  # 50% Wahrscheinlichkeit, das Spiel frühzeitig zu beenden
            # print("Spiel wird frühzeitig beendet (Unentschieden)!")
            break

        if current_player == 1:
            position = random.randint(0, 8)
            while board[position] != 0:
                position = random.randint(0, 8)
            board[position] = 1
        else:
            position = random.randint(0, 8)
            while board[position] != 0:
                position = random.randint(0, 8)
            board[position] = 2

        winner = check_winner(board)
        if winner != 0:
            # print_board(board)
            # print(f"Spieler {winner} gewinnt!")
            with open("game_results.txt", "a") as f:
                f.write(','.join(map(str, board)) + f";{winner}\n")
            break

        if is_board_full(board):
            # print_board(board)
            # print("Unentschieden!")
            with open("game_results.txt", "a") as f:
                f.write(','.join(map(str, board)) + ";0\n")
            break

        current_player = 3 - current_player  # Switch player (1 -> 2, 2 -> 1)

if __name__ == "__main__":
    for i in range(10000):
        play_game()
