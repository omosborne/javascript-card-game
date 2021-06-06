import card


class Position:
    def __init__(self):
        self.card_obj = None

    def __getitem__(self, item):
        return self

    def add_card(self, card_name):
        self.card_obj = card.Card(card_name)

    def remove_card(self):
        self.card_obj = None

    def get_card_name(self):
        if self.card_obj is None:
            return "Empty"
        else:
            return self.card_obj.get_name()
