import card
import random


card_names = ["Card 1", "Card 2", "Card 3", "Card 4"]
card_obj = None


class Position(object):
    def __init__(self):
        self.card = None

    def __getitem__(self, item):
        return self

    def add_card(self):
        card_obj = card.Card()
        # random.choice(card_names))

    def remove_card(self):
        self.card = None

    def get_card_name(self):
        return card_obj.get_name()
