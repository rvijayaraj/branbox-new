// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova','ngRoute', 'starter.controllers','starter.services','ngSanitize'])

.run(function($ionicPlatform, $ionicPopup,$cordovaPush,$rootScope,$http,$cordovaSQLite,$cordovaFileTransfer,$cordovaNetwork,$timeout) {
        $ionicPlatform.ready(function() {
            if(window.Connection) {
                if($cordovaNetwork.isOnline()) {
                    
                    localStorage.setItem("businessId",1);
                     var businessId= localStorage.getItem("businessId");
                    //Menu page start
                    //alert(businessId);
                        //$ionicLoading.show({
                        //    template: 'Loading...'
                        //});

                    $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxMenu.php',{bussId: businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                    .success(function (data) {
                        var ajaxlength = data.rows.length;
                       // alert(ajaxlength);
                        
                        var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                        db.transaction(function(tx){
                            tx.executeSql('DROP TABLE IF EXISTS menu');
                            tx.executeSql('CREATE TABLE IF NOT EXISTS menu (id INTEGER, businessId INTEGER, name TEXT, image TEXT, position TEXT, status TEXT, online TEXT)');
                            

                            for(var i=0; i < ajaxlength; i++){

                                var url = data.rows[i]['image'];
                                var filename =url.split("/").pop();
                                var targetPath = cordova.file.externalRootDirectory+"Branbox/Menu/"+ filename;
                                var trustHosts = true
                                var options = {};
                                $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                  .then(function(result) {
                                    // Success!
                                    // alert(JSON.stringify(result));
                                  }, function(error) {
                                    // Error
                                    // alert(JSON.stringify(error));
                                  }, function (progress) {
                                    $timeout(function () {
                                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                    })
                                  });
                                tx.executeSql('INSERT OR REPLACE INTO menu (id,businessId, name,image, position, status, online) VALUES("' + data.rows[i].id + '","' + data.rows[i].businessId + '","' + data.rows[i].name + '","' + targetPath + '","' + data.rows[i].position + '", "' + data.rows[i].status +'", "' + data.rows[i].online +'")',successID);
                                //alert(data.rows[i].name);
                            }
                        });
                    }).error(function(){  
                        // open(location, '_self').close(); 
                        // alert("server Error");
                    });
                    //Menu page end

                    //Sub Menu page Start
                    $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxGetAllData.php',{bussId: businessId,nav:"subMenu"}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                    .success(function (data) {
                        var ajaxlength = data.rows.length;
                        //alert(ajaxlength);
                        
                        var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                        db.transaction(function(tx){
                            tx.executeSql('DROP TABLE IF EXISTS subMenu');
                            tx.executeSql('CREATE TABLE IF NOT EXISTS subMenu (id INTEGER, businessId INTEGER, menuId INTEGER, name TEXT, image TEXT, position TEXT, status TEXT, online TEXT)');
                            
                            for(var i=0; i < ajaxlength; i++){

                                var url = data.rows[i]['image'];
                                var filename =url.split("/").pop();
                                var targetPath = cordova.file.externalRootDirectory+"Branbox/SubMenu/"+ filename;
                                var trustHosts = true
                                var options = {};
                                $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                  .then(function(result) {
                                    // Success!
                                    // alert(JSON.stringify(result));
                                  }, function(error) {
                                    // Error
                                    // alert(JSON.stringify(error));
                                  }, function (progress) {
                                    $timeout(function () {
                                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                    })
                                  });

                                tx.executeSql('INSERT OR REPLACE INTO subMenu (id,businessId,menuId, name,image, position, status, online) VALUES("' + data.rows[i].id + '","' + data.rows[i].businessId + '","'+data.rows[i].menuId+ '","' + data.rows[i].name + '","' + targetPath + '","' + data.rows[i].position + '", "' + data.rows[i].status +'", "' + data.rows[i].online +'")',successID);

                            }
                        });
                    }).error(function(){  
                        // open(location, '_self').close(); 
                        // alert("server Error");
                    });
                    //Sub Menu page end


                    //Color Settings Start..

                    $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxColorSettings.php',{bussId:businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                    .success(function (colorSettings) {
                        var colorSetting=colorSettings.rows;
                        var HeaderColor=colorSettings.rows[0]['headerColor'].toString();
                        localStorage.setItem("HeaderColor",HeaderColor);
                        var HeaderLogo=colorSettings.rows[0]['favIcon'];
                        var SideHeaderLogo=colorSettings.rows[0]['bannerImage'];
                        var currencyFormat=colorSettings.rows[0]['currencyFormat'];
                       // alert(HeaderColor+"Header Color"+currencyFormat+"Format");
                        var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                        db.transaction(function(tx){
                            tx.executeSql('DROP TABLE IF EXISTS colorSetting');
                            tx.executeSql('CREATE TABLE IF NOT EXISTS colorSetting (id INTEGER, businessId INTEGER,currencyFormat TEXT,HeaderColor TEXT,HeaderLogo TEXT,SideHeaderLogo TEXT)');
                            
                                var url =HeaderLogo;
                                var filename1 =url.split("/").pop();
                                var targetPath1 = cordova.file.externalRootDirectory+"Branbox/colorSettings/"+ filename1;
                                var trustHosts = true
                                var options = {};
                                $cordovaFileTransfer.download(url, targetPath1, options, trustHosts)
                                  .then(function(result) {
                                  }, function(error) {
                                  }, function (progress) {
                                    $timeout(function () {
                                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                    })
                                  });

                                var url =SideHeaderLogo;
                                var filename2 =url.split("/").pop();
                                var targetPath2 = cordova.file.externalRootDirectory+"Branbox/colorSettings/"+ filename2;
                                var trustHosts = true
                                var options = {};
                                $cordovaFileTransfer.download(url, targetPath2, options, trustHosts)
                                  .then(function(result) {
                                  }, function(error) {
                                  }, function (progress) {
                                    $timeout(function () {
                                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                    })
                                  });

                                tx.executeSql('INSERT OR REPLACE INTO colorSetting (id,businessId,currencyFormat,HeaderColor,HeaderLogo,SideHeaderLogo) VALUES("1","'+businessId+'","' +currencyFormat+'","'+HeaderColor+'","'+targetPath1+'","'+targetPath2+'")',successID);
                              });  
                    }).error(function(){  

                    });
                    //Color Settings End..
                    
                    //Item Data Start.
                    
                    $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxGetAllData.php',{bussId: businessId,nav:"item"}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                    .success(function (data) {
                        var ajaxlength = data.rows.length;
                        //alert(data.rows[0]['price']+"outer Item");
                        
                        var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                        db.transaction(function(tx){
                            tx.executeSql('DROP TABLE IF EXISTS item');
                          //  tx.executeSql('DROP TABLE IF EXISTS iteming');
                            tx.executeSql('DROP TABLE IF EXISTS orderitems');
                            tx.executeSql('DROP TABLE IF EXISTS orderingredients');
                            tx.executeSql('DROP TABLE IF EXISTS orderitemingredients');
                            
                            tx.executeSql('CREATE TABLE IF NOT EXISTS item (id INTEGER, businessId INTEGER,menuId INTEGER,subMenuId INTEGER,name TEXT,image TEXT,price TEXT,tax TEXT,offers TEXT,positions TEXT, status TEXT, online TEXT)');
                           //tx.executeSql('CREATE TABLE IF NOT EXISTS iteming (id INTEGER)');
                           // tx.executeSql('CREATE TABLE IF NOT EXISTS itemingredients (id INTEGER, businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,ingredients TEXT, price TEXT, category TEXT)');                                   
                            tx.executeSql('CREATE TABLE IF NOT EXISTS orderitems (id INTEGER PRIMARY KEY AUTOINCREMENT,businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,userId INTEGER, itemName TEXT, image TEXT, price TEXT, subTotal TEXT, quantity TEXT,tax TEXT,offers TEXT,orderType TEXT)');
                            tx.executeSql('CREATE TABLE IF NOT EXISTS orderingredients (id INTEGER PRIMARY KEY AUTOINCREMENT,businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,userId INTEGER, ingId INTEGER,ingredients TEXT,price TEXT, ingredientsYN TEXT, extras TEXT)'); 
                            tx.executeSql('CREATE TABLE IF NOT EXISTS orderitemingredients (id INTEGER PRIMARY KEY AUTOINCREMENT,itemStorageId INTEGER, businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,userId INTEGER, ingId INTEGER, ingredients TEXT, price TEXT, ingredientsYN TEXT, extras TEXT)');                                   
                           
                            for(var i=0; i < ajaxlength; i++){
                                var url = data.rows[i]['image'];
                                var filename =url.split("/").pop();
                                var targetPath = cordova.file.externalRootDirectory+"Branbox/Item/"+ filename;
                                var trustHosts = true
                                var options = {};
                                $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                  .then(function(result) {
                                    // Success!
                                    // alert(JSON.stringify(result));
                                  }, function(error) {
                                    // Error
                                    // alert(JSON.stringify(error));
                                  }, function (progress) {
                                    $timeout(function () {
                                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                    })
                                  });
                                tx.executeSql('INSERT OR REPLACE INTO item (id,businessId,menuId,subMenuId,name,image,price,tax,offers,positions,status,online) VALUES("'+data.rows[i].id+'","'+data.rows[i].businessId+'","'+data.rows[i].menuId+'","'+data.rows[i].subMenuId+'","'+data.rows[i].name+'","'+targetPath+'","'+ data.rows[i].price+'","'+ data.rows[i].tax+'","'+data.rows[i].offers+'","'+data.rows[i].positions+'", "'+data.rows[i].status+'", "'+data.rows[i].online+'")',successID);
                               
                            }
                        });
                    }).error(function(){  
                        // open(location, '_self').close(); 
                        // alert("server Error");
                    });
                    
                    
                    //Item Data End..
                    //Item Ingredients Start
                    $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxGetAllData.php',{bussId: businessId,nav:"itemIng"}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                    .success(function (jsonIng) {
                         var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                        db.transaction(function(tx){
                            tx.executeSql('DROP TABLE IF EXISTS itemings');
                            tx.executeSql('CREATE TABLE IF NOT EXISTS itemings (id INTEGER, businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,ingredients TEXT, price TEXT, category TEXT)');
                        //alert(jsonIng.rows.length);
                        // alert(jsonIng.rows.length+" outer Ing");
                            for(var i = 0; i < jsonIng.rows.length; i++) {
                                tx.executeSql('INSERT OR REPLACE INTO itemings(id,businessId,menuId,subMenuId,itemId,ingredients,price,category) VALUES("'+jsonIng.rows[i].id+'","'+jsonIng.rows[i].businessId+'","'+jsonIng.rows[i].menuId+'","'+jsonIng.rows[i].subMenuId+'","'+jsonIng.rows[i].itemId+'","'+jsonIng.rows[i].ingredients+'","'+jsonIng.rows[i].price+'","'+jsonIng.rows[i].category+'")',successID);
                            }
                        });
                    }).error(function(){  
                        // open(location, '_self').close(); 
                        // alert("server Error");
                    });
                    //Item Ingredients End
                    
                   //Business Details Start
                       $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxGetAllData.php',{bussId: businessId,nav:"businessDetails"}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                    .success(function (business) {
                        
                         var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                        db.transaction(function(tx){
                            tx.executeSql('DROP TABLE IF EXISTS businessDetails');
                            tx.executeSql('CREATE TABLE IF NOT EXISTS businessDetails (businessId INTEGER, brandName TEXT,companyName TEXT,address1 TEXT,address2 TEXT,city TEXT,state TEXT,country TEXT,postalCode TEXT,phoneNumber1 TEXT,phoneNumber2 TEXT,email1 TEXT,email2 TEXT,website TEXT,latitude TEXT,longitude TEXT)');
                       
                            for(var i = 0; i < business.rows.length; i++) {
                                tx.executeSql('INSERT INTO businessDetails(businessId, brandName,companyName,address1,address2,city,state,country,postalCode,phoneNumber1,phoneNumber2,email1,email2,website,latitude,longitude) VALUES ("'+business.rows[i].businessId+'","'+business.rows[i].brandName+'","'+business.rows[i].companyName+'","'+business.rows[i].address1+'","'+business.rows[i].address2+'","'+business.rows[i].city+'","'+business.rows[i].state+'","'+business.rows[i].country+'","'+business.rows[i].postalCode+'","'+business.rows[i].phoneNumber1+'","'+business.rows[i].phoneNumber2+'","'+business.rows[i].email1+'","'+business.rows[i].email2+'","'+business.rows[i].website+'","'+business.rows[i].latitude+'","'+business.rows[i].longitude+'")',successID);
                            }
                            
                        });
                    }).error(function(){  
                        
                    });
                        
                    //
                   
                   
                    $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/branbox.php', {branboxVariable:'gallery',businessId:'1'},{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} })     
                      .success(function(data){
                        var pushArry = [];
                        var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                        db.transaction(function(tx){
                            tx.executeSql('DROP TABLE IF EXISTS gallery');
                            tx.executeSql('CREATE TABLE IF NOT EXISTS gallery (id INTEGER PRIMARY KEY AUTOINCREMENT, images TEXT)');
                            $.each(data.imageUrl, function(key, value) {
                                var url = value;
                                var filename =url.split("/").pop();
                                var targetPath = cordova.file.externalRootDirectory+"Branbox/gallery/"+ filename;
                                var trustHosts = true
                                var options = {};
                                $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                    .then(function(result) {
                                        //alert(JSON.stringify(result));
                                    }, function(error) {
                                    }, function (progress) {
                                        $timeout(function () {
                                        $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                    })
                                  });
                                tx.executeSql('INSERT OR REPLACE INTO gallery (images) VALUES("' + targetPath + '")',successID);
                            })
                        })
                        db.transaction(function(tx){
                            tx.executeSql('DROP TABLE IF EXISTS video');
                            tx.executeSql('CREATE TABLE IF NOT EXISTS video (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT)');
                            $.each(data.videoUrl, function(key, value) {
                                var url = value;
                                var filename =url.split("/").pop();
                                var targetPath = cordova.file.externalRootDirectory+"Branbox/video/"+ filename;
                                var trustHosts = true
                                var options = {};
                                $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                  .then(function(result) {
                                    // Success!
                                    // alert(JSON.stringify(result));
                                  }, function(error) {
                                    // Error
                                    // alert(JSON.stringify(error));
                                  }, function (progress) {
                                    $timeout(function () {
                                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                    })
                                  });
                                tx.executeSql('INSERT OR REPLACE INTO video (url) VALUES("' + targetPath + '")',successID);
                            })  
                        })
                    })
                    //gallery end  

                    //aboutUs start
                    $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/branbox.php', {branboxVariable:'aboutUs',businessId:businessId},{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} })     
                    .success(function(data) {
                       
                        var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                        db.transaction(function(tx){
                            tx.executeSql('DROP TABLE IF EXISTS aboutUs');
                            tx.executeSql('CREATE TABLE IF NOT EXISTS aboutUs (id INTEGER PRIMARY KEY AUTOINCREMENT, businessId INTEGER, title TEXT, description TEXT, image TEXT)');
                            for(var i=0; i < data.aboutus.length; i++){
                                var url = data.aboutus[i].image;
                                var filename =url.split("/").pop();
                                var targetPath = cordova.file.externalRootDirectory+"Branbox/Aboutus/"+ filename;
                                var trustHosts = true
                                var options = {};
                                $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                  .then(function(result) {
                                    // Success!
                                    // alert(JSON.stringify(result));
                                  }, function(error) {
                                    // Error
                                    // alert(JSON.stringify(error));
                                  }, function (progress) {
                                    $timeout(function () {
                                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                    })
                                  });
                                tx.executeSql('INSERT OR REPLACE INTO aboutUs (businessId, title, description,image) VALUES("'+data.aboutus[i].businessId+'","'+data.aboutus[i].title+'","'+data.aboutus[i].description+'","'+targetPath+'")',successID);
                            }
                        });

                        //db.transaction(function(tx){
                        //    tx.executeSql('DROP TABLE IF EXISTS aboutUsImage');
                        //    tx.executeSql('CREATE TABLE IF NOT EXISTS aboutUsImage (id INTEGER PRIMARY KEY AUTOINCREMENT,  image BLOB)');
                        //    $.each(data.aboutImage, function(key, value) {
                        //        tx.executeSql('INSERT OR REPLACE INTO aboutUsImage (image) VALUES("' + value + '")',successID);
                        //    })
                        //});
                        db.transaction(function(tx){
                            tx.executeSql('DROP TABLE IF EXISTS aboutUsGallery');
                            tx.executeSql('CREATE TABLE IF NOT EXISTS aboutUsGallery (id INTEGER PRIMARY KEY AUTOINCREMENT,  aboutGalleryImages BLOB)');
                            $.each(data.aboutGallery, function(key, value) {
                                var url =value;
                                var filename =url.split("/").pop();
                                var targetPath = cordova.file.externalRootDirectory+"Branbox/AboutusGallery/"+ filename;
                                var trustHosts = true
                                var options = {};
                                $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                  .then(function(result) {
                                    // Success!
                                    // alert(JSON.stringify(result));
                                  }, function(error) {
                                    // Error
                                    // alert(JSON.stringify(error));
                                  }, function (progress) {
                                    $timeout(function () {
                                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                    })
                                  });
                                  
                                tx.executeSql('INSERT OR REPLACE INTO aboutUsGallery (aboutGalleryImages) VALUES("'+targetPath+ '")',successID);
                            })
                        });
                    })
                    //aboutUs end

                    
            
                    localStorage.setItem("InterNetConnection","yes");
                    function successID(){
                      return true;
                    }

                     var androidConfig = {
                              "senderID": "500706511162",
                              "ecb": "notificationReceived"
                            };

                    document.addEventListener("deviceready", function(){
                        $cordovaPush.register(androidConfig).then(function(result) {
                            //alert('You are registered for get latest notification');
                          // Success
                        }, function(err) {
                            //alert(err);
                          // Error
                        })
                        $cordovaPush.unregister(options).then(function(result) {
                              //alert(result);
                            }, function(err) {
                              //alert(err);
                            })

                    }, false);


                }
                else{
                        var netConnection=localStorage.getItem("InterNetConnection");
                        if(netConnection!="yes")
                        {   
                            alert(" Initialization Error.. Please Connect InterNet");
                            ionic.Platform.exitApp();
                        }
                        
                }

            }

        });
})





.config(['$routeProvider','$stateProvider', function($routeProvider,$stateProvider) {
  $routeProvider
    .when('/menu',
        {
            templateUrl: 'templates/menu.html',
            controller: 'MenuController'
        })
   .when('/subMenu/=:id',
        {
            templateUrl: 'templates/subMenu.html',
            controller: 'SubMenuController'
        })
   .when('/items/=:menuId=:subMenuId',
        {
            templateUrl: 'templates/items.html',
            controller: 'SubMenuItemController'
        })
   .when('/addTocartpage',
        {
            templateUrl: 'templates/addItemTocart.html',
            controller: 'AddToCartCtrl'
        })
    .when('/contactForm',
        {
            templateUrl: 'templates/contactForm.html',
            controller: 'contactCtrl'
        })
    .when('/location',
        {
            templateUrl: 'templates/location.html',
            controller: 'locationCtrl'
        })
    .when('/myAccount',
        {
            templateUrl: 'templates/myAccount.html',
            
        })
    .when('/login',
        {
            templateUrl: 'templates/login.html',
            controller: 'authentication'
        })

    .when('/register',
        {
            templateUrl: 'templates/register.html',
            controller: 'registerForm'
        })
    .when('/forgotPassword',
        {
            templateUrl: 'templates/forgotPassword.html',
            controller: 'ForgotPassCtrl'
        })
    .when('/latestOffers',
        {
            templateUrl: 'templates/latestOffer.html',
            //controller: 'DashCtrl'
        })
    .when('/gallery',
        {
            templateUrl: 'templates/gallery.html',
            controller: 'gallery'
        })
    .when('/aboutUs',
        {
            templateUrl: 'templates/aboutUs.html',
            controller: 'aboutUs'
        })
    .when('/aboutGallery',
        {
            templateUrl: 'templates/aboutGallery.html',
            controller: 'aboutUs'  
        })
    .when('/timeDelivery',
        {
            templateUrl: 'templates/timeDelivery.html',
            controller: 'timeDelivery'
        })
    .when('/message',
        {
            templateUrl: 'templates/message.html',
            controller: 'MenuController'
        })
     .when('/tableBooking',
        {
            templateUrl: 'templates/tableBooking.html',
            //controller: 'registerForm'
        })
     .when('/myProfile',
        {
            controller: 'myProfileDetail',
            templateUrl: 'templates/myProfile.html'
        })
    .otherwise('/menu');

}]);
window.notificationReceived = function (notification) {
    //alert(notification.event);
        switch(notification.event) {
            case 'registered':
                if (notification.regid.length > 0 ) {
                 // prompt("Copy to clipboard", notification.regid);
                localStorage.setItem("regid",notification.regid);
                var regid = localStorage.getItem("regid");
                }
                break;
            case 'message':
                localStorage.setItem("notificationMessage",notification.message);
                var token=notification.message;
                    var tokenNo=token.split(":");
                    if(tokenNo[0]=="Your Table Token No")
                    {
                        //swal({
                        //    title: token,
                        //    timer: 5000,
                        //    showConfirmButton: false 
                        //});
                       
                        localStorage.setItem("tokenNumber",tokenNo[1]);
                        localStorage.setItem("showoToken","yes");
                        var now = moment().format("DD-MM-YYYY");
                        localStorage.setItem("tokenDate",now);
                        //swal("This is your token Number!: "+token,now);
                        swal({   
                            title: "This is your token Number!",   
                            text: token,  
                            confirmButtonColor: "#DD6B55",   
                            confirmButtonText: "OK!!!!",  
                        });
                    }
                    else
                    {
                         //swal({
                         //       title: token,
                         //       timer: 5000,
                         //       showConfirmButton: false 
                         //   });
                        swal("Message form the Branbox!",token);
                    }
               
                //alert(notification.message);
                break;

            case 'error':
                alert('GCM error = ' + notification.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    };