
# challenge-2.py

# cd explore_html_css/python
# python challenge-2.py


# Challenge 2: Number Guessing Game

# Problem:
    # Ask the user to enter their name.
    # Generate a random number between 1 and 20.
    # Ask the user to guess the number.
    # Give feedback:
        # If the guess is too high, print “Too high, try again!”
        # If the guess is too low, print “Too low, try again!”
    # Repeat until the user guesses the number correctly.
    # When the user guesses correctly, print a congratulatory message including the user’s name and the number of attempts it took.

# Extra challenge (optional):
    # Keep a list of all guesses and display them at the end.
    # Limit the number of attempts to 5, and tell the user if they lose.\

# This will help you practice:
    # input() for user input
    # while loops
    # if/else conditions
    # random module
    # lists for storing guesses
import random
name = input("Enter your name: ")
num = random.randint(1, 20)
input_num = input("Guess the number: ")
if input_num == num:
    print("Congrats {name}, you guess the correct number: {num}")
else:
    print("Incorrect Guess")
    

    