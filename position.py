import card
# import random


# card_names = ["Card 1", "Card 2", "Card 3", "Card 4"]


class Position:
    def __init__(self):
        self.card_obj = None

    def __getitem__(self, item):
        return self

    def add_card(self):
        self.card_obj = card.Card()
        # random.choice(card_names))

    def remove_card(self):
        self.card_obj = None

    def get_card_name(self):
        if self.card_obj is None:
            return "Empty"
        else:
            return self.card_obj.get_name()