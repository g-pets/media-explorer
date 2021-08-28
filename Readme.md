# Youtuber

## Steps
### Collect Videos
### Manage & Tag Videos



## Settings
* Mongo: `mongodb://user:password@youtuber-mongo:27017`


## Mongo Shell
1. Connect to MongoDB container;
1. Run Mongo Shell: `mongo`;
2. Swtich to Admin DB: `use admin`;
3. Login: `db.auth("user","password")`;
4. Swticth to DB: `use youtuber`;

### Commands
1. Count docs: `db.videos.count()`;
2. Insert new field to all docs: `db.videos.updateMany({},{$set: {"theme":[]}})`
3. Remove field from all docs: `db.videos.updateMany({},{"$unset":{theme:""}})`
4. Dublicate collection: `db.videos.aggregate([{ $match: {} }, { $out: "videos2" }])`
5. Remove dublicates by filed, with index creation: `db.videos.ensureIndex({id: 1}, {unique: true, dropDups: true}) `


## Hotkeys
* Alt + Click: Reject
* Command + Click: Select


## Bugs:
* Fix "Strip view" when one element;

## Need to fix:
* Improve slideshow on hover;