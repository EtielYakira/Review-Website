from mongoengine import *


class Places(Document):
    _id = ObjectIdField()
    userId = ObjectIdField()
    establishDate = DateField()
    name = StringField()
    owner = StringField()
    summeryText = StringField()
    image = StringField()
    address = DictField()
    workingHours = DictField()
    verified = BooleanField(default=False)


class Users(Document):

    name = StringField()
    password = StringField()
    email = StringField()
    subscription = BooleanField(defualt=False)
    profileImage = StringField()
    preferredCategory = IntField()


class Categories(Document):
    name = StringField()
    tags = ListField()


class Review(Document):
    place_id = ObjectIdField()
    user_id = ObjectIdField()
    postDate = DateField()
    reviewBody = StringField()
    images = ListField()
