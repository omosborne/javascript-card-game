class Card:
    def __init__(self, card_name):
        self.name = card_name
        self.image = None
        self.stats = {
            "North": None,
            "East": None,
            "South": None,
            "West": None,
        }

    def get_name(self):
        return self.name
