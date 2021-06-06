# import random


class Card:
    def __init__(self, card_name):
        # self.card_names = ["Card 1", "Card 2", "Card 3", "Card 4"]
        self.name = card_name
        # random.choice(self.card_names)

    def get_name(self):
        return self.name
