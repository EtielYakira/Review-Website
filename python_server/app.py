import sys

from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient
from api_constans import db_password
from mongoengine import *
from flask_mongoengine import MongoEngine
import json
from flask_cors import CORS, cross_origin
from uuid import uuid4
import os

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MONGODB_SETTINGS'] = {
    'host': f'mongodb+srv://etl:{db_password}@review-website.8xmmf.mongodb.net/review-website?retryWrites=true&w=majority'
}
db = MongoEngine(app)


class Places(db.Document):
    userId = db.ObjectIdField()
    establishDate = db.DateField()
    name = db.StringField()
    owner = db.StringField()
    summeryText = db.StringField()
    image = db.StringField()
    address = db.DictField()
    workingHours = db.DictField()
    verified = db.BooleanField(default=False)
    tags = db.ListField()


class Users(db.Document):

    name = db.StringField()
    password = db.StringField()
    email = db.StringField()
    subscription = db.BooleanField(defualt=False)
    profileImage = db.StringField()
    preferredCategory = db.IntField()

    def to_json(self):
        return {
            'user_id': self.user_id,
            'name': self.name,
            'password': self.password,
            'email': self.email,
            'subscription': self.subscription,
            'profile_image': self.profile_image
        }


class Categories(db.Document):
    name = db.StringField()
    tags = db.ListField()


class Review(db.Document):
    place_id = db.ObjectIdField()
    user_id = db.ObjectIdField()
    postDate = db.DateField()
    reviewBody = db.StringField()
    images = db.ListField()


def add_image(image):
    print('uploasdf inages')
    if not os.path.isdir('uploads'):
        os.makedirs('uploads')
    extension = image.filename.rpartition(".")[-1]
    image_name = f"product_{uuid4()}.{extension}"
    image.save(os.path.join('/../Client/public/uploads/', image_name))
    return image_name


def add_place(place, image):
    print('adding place')
    image_name = add_image(image)

    Places(name=place["name"], owner=place["owner"], address={"city": place["city"], 'country': place["country"], 'streetName': place["streetName"], 'streetNumber': place["streetNumber"]}, category=place['category'], establishDate=place['establishDate'], workingHours={'open':place['openingHour'], 'close': place['closingHour']}, summeryText=place['summeryText'], tags=place['tags'].split(','), image=image_name).save()

    add_response = dict()
    add_response["status"] = "ok"
    add_response["message"] = "ADD PLACE"
    return add_response




@app.route("/")
@app.route('/home')
def home():
    return render_template('home.html')


# PLACE ROUTES
@app.route('/places', methods=['GET', 'POST'])
@cross_origin()
def get_all_places():
    try:
        if request.method == 'GET':
            print('its get')
            places = Places.objects()
            return jsonify(places), 200
        # return render_template('places.html', places_to_show=placess)
        elif request.method == "POST":
            print('is a post')

            new_place = dict(request.form)

            print('asdasdasdaaaaaaaaaaaaaaaaaaaaaaaaaa')
            image = request.files
            image = image["image"]
            response = add_place(new_place, image)
            return response, 200

    except Exception as e:
        print('worls')
        return json.dumps({'error': str(e)})


@app.route('/places/<place_id>', methods=['GET'])
def get_place_by_id(place_id):
    try:
        place = Places.objects(id=place_id).first()
        return jsonify(place), 200
        # return render_template('place.html', the_place=the_place)
    except Exception as e:
        return json.dumps({'error': str(e)})


#  USERS ROUTES
@app.route('/users')
def get_all_users():
    try:
        users = Users.objects()
        return jsonify(users), 200
    except Exception as err:
        return json.dumps(({'error': str(err)}))


@app.route('/users/<user_id>', methods=['GET'])
def get_user_by_id(user_id):
    try:
        user = Users.objects(id=user_id).first()
        return jsonify(user), 200
        # return render_template('place.html', the_place=the_place)
    except Exception as e:
        return json.dumps({'error': str(e)})


# CATEGORY ROUTES

@app.route('/categories', methods=['GET'])
def get_all_categories():
    try:
        categories = Category.objects()
        return jsonify(categories), 200
    except Exception as err:
        return json.dumps(({'error': str(err)}))


@app.route('/images', methods=['GET'])
def get_all_images():
    try:
        images = Image.objects()
        return jsonify(images), 200
    except Exception as err:
        return json.dumps(({'error': str(err)}))


@app.route('/tags', methods=['GET'])
def get_all_tags():
    try:
        tags = Tag.objects()
        return jsonify(tags), 200
    except Exception as err:
        return json.dumps(({'error': str(err)}))


@app.route('/reviews', methods=['GET'])
def get_all_reviews():
    try:
        reviews = Review.objects()
        return jsonify(reviews), 200
    except Exception as err:
        return json.dumps(({'error': str(err)}))



