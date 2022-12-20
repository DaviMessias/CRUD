sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/resource/ResourceModel"
 
 ], function(Controller,ResourceModel) {
     'use strict';

     const caminhoApp= "sap.ui.demo.walkthrough.controller.App";
     return Controller.extend(caminhoApp,{
      
        onInit : function(){
         let i18nModel = new ResourceModel({
            bundleName: "sap.ui.demo.walkthrough.i18n.i18n"
         });
         this.getView().setModel(i18nModel, "i18n");
        }
     });
 });