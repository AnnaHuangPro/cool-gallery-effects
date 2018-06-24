
window.indexedDB = window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction;

window.IDBKeyRange = window.IDBKeyRange ||
    window.webkitIDBKeyRange ||
    window.msIDBKeyRange;

(function (window) {

    'use strict';

    let db = {

        version: 1, // important: only use whole numbers!

        objectStoreName: 'tasks',

        instance: {},

        upgrade: function (e) {

            let
                _db = e.target.result,
                names = _db.objectStoreNames,
                name = db.objectStoreName;

            if (!names.contains(name)) {

                _db.createObjectStore(
                    name,
                    {
                        keyPath: 'id',
                        autoIncrement: true
                    });
            }
        },

        errorHandler: function (error) {
            window.alert('error: ' + error.target.code);
            debugger;
        },

        open: function (callback) {

            let request = window.indexedDB.open(
                db.objectStoreName, db.version);

            request.onerror = db.errorHandler;

            request.onupgradeneeded = db.upgrade;

            request.onsuccess = function (e) {

                db.instance = request.result;

                db.instance.onerror =
                    db.errorHandler;

                callback();
            };
        },

        getObjectStore: function (mode) {

            let txn, store;

            mode = mode || 'readonly';

            txn = db.instance.transaction(
                [db.objectStoreName], mode);

            store = txn.objectStore(
                db.objectStoreName);

            return store;
        },

        save: function (data, callback) {

            db.open(function () {

                let store, request,
                    mode = 'readwrite';

                store = db.getObjectStore(mode),

                    request = data.id ?
                        store.put(data) :
                        store.add(data);

                request.onsuccess = callback;
            });
        },

        getAll: function (callback) {

            db.open(function () {

                let
                    store = db.getObjectStore(),
                    cursor = store.openCursor(),
                    data = [];

                cursor.onsuccess = function (e) {

                    let result = e.target.result;

                    if (result &&
                        result !== null) {

                        data.push(result.value);
                        result.continue();

                    } else {

                        callback(data);
                    }
                };

            });
        },

        get: function (id, callback) {

            id = parseInt(id);

            db.open(function () {

                let
                    store = db.getObjectStore(),
                    request = store.get(id);

                request.onsuccess = function (e) {
                    callback(e.target.result);
                };
            });
        },

        'delete': function (id, callback) {

            id = parseInt(id);

            db.open(function () {

                let
                    mode = 'readwrite',
                    store, request;

                store = db.getObjectStore(mode);

                request = store.delete(id);

                request.onsuccess = callback;
            });
        },

        deleteAll: function (callback) {

            db.open(function () {

                let mode, store, request;

                mode = 'readwrite';
                store = db.getObjectStore(mode);
                request = store.clear();

                request.onsuccess = callback;
            });

        }
    };

    window.app = window.app || {};
    window.app.db = db;

}(window));

app.db.objectStoreName = "coolGallery";


/*----以下是操作数据库的方法------*/
/*

//add data
app.db.save({ id: 2, name: "wolfy" }, function () {
    //回调函数
    console.log("添加成功");
});

//查询
app.db.get(2, function (item) {
    console.log(item);
});

//query all
app.db.getAll(function (items) {
    console.log(items);
});

//delete
app.db.delete(2, function () {
    console.log('删除成功');
})

//deleteall
app.db.deleteAll(function () {
    console.log("删除成功");
})

*/
