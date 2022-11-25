sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/resource/ResourceModel"
 
 ], function(Controller,ResourceModel) {
     'use strict';
     return Controller.extend("sap.ui.demo.walkthrough.controller.App",{
        onInit : function(){
            // set i18n model on view
         var i18nModel = new ResourceModel({
            bundleName: "sap.ui.demo.walkthrough.i18n.i18n"
         });
         this.getView().setModel(i18nModel, "i18n");
        }


     });
     
 });