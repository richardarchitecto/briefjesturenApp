/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var module = angular.module('briefjesturen', ['ionic', 'ngSanitize']);
 

module.controller('briefCtrl', function($scope, $ionicModal, brieven){
 

 $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };



$scope.brief = {};
 $scope.pdf = function(brief){



       brieven(brief);


    }
     $scope.preview = function(){
       
       // Coming soon
    }
     $scope.briefjesturen = function(){
       
       // Coming soon
    }
   



});

module.factory('brieven', function(){
   
    return function(brief){

console.log(brief);
var adres = "";
var adresLength = 0;
if(brief.adres != undefined){
    if(brief.adres.aan != undefined){
        adres = adres + brief.adres.aan + "\n";
    }
   if(brief.adres.straat != undefined){
        adres = adres + brief.adres.straat + "\n";
    }
   if(brief.adres.postcode != undefined){
        adres = adres + brief.adres.postcode + "\n";
    }
    if(brief.adres.stad != undefined){
        adres = adres + brief.adres.stad + "\n";
    }
adres = adres + "\n";
adresLength++;
}
if(brief.afzender != undefined){
    if(brief.afzender.aan != undefined){
adres = adres + brief.afzender.aan + "\n";
    }
    if(brief.afzender.straat != undefined){
adres = adres + brief.afzender.straat + "\n";
    }

    if(brief.afzender.postcode != undefined){
adres = adres + brief.afzender.postcode + "\n";
    }
    if(brief.afzender.stad != undefined){
adres = adres + brief.afzender.stad + "\n";
    }

        if(brief.afzender.land != undefined){
adres = adres + brief.afzender.land + "\n";
    }

 adresLength++;
 }

var brieftekst = "";

if(brief.tekst != undefined){
    brieftekst = brief.tekst;
}


var offset = 50 * adresLength;

    var doc = new jsPDF();
    doc.text(20, 20, adres);
    brieftekst = doc.splitTextToSize(brieftekst,577.5);
    doc.text(20, offset, brieftekst);
  
 var string =  doc.output();


   
    // Save the PDF



        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);


    function gotFS(fileSystem) {
   

     fileSystem.root.getFile("briefjesturen.pdf", {create: true, exclusive: false}, gotFileEntry, fail);
    
    }

    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
   

        writer.write(string);
     
cordova.plugins.fileOpener2.open(
        '/sdcard/briefjesturen.pdf', 
        'application/pdf', 
        { 
            error : function(errorObj) { 
                alert('Error status: ' + errorObj.status + ' - Error message: ' + errorObj.message); 
            },
            success : function () {
                         
            }
        }
    );


    }

    function fail(error) {
        console.log(error.code);
    }









    }
}



)


