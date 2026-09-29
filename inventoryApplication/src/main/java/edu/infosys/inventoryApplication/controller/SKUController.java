package edu.infosys.inventoryApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.inventoryApplication.bean.SKU;
import edu.infosys.inventoryApplication.dao.SkuDao;

@RestController
@RequestMapping("/invent")
@CrossOrigin(origins = "http://localhost:3131", allowCredentials = "true")
public class SKUController {

    @Autowired
    private SkuDao skuDao;

    @PostMapping("/sku")
    public void saveSKU(@RequestBody SKU sku) {
        skuDao.saveSKU(sku);
    }

    @GetMapping("/sku")
    public List<SKU> getAllSKUs() {
        return skuDao.getAllSKUs();
    }

    @GetMapping("/sku/{id}")
    public SKU getSKUById(@PathVariable String id) {
        return skuDao.getSKUById(id);
    }

    @DeleteMapping("/sku/{id}")
    public void deleteSKUById(@PathVariable String id) {
        skuDao.deleteSKUById(id);
    }

    @PutMapping("/sku")
    public void updateSKU(@RequestBody SKU sku) {
        skuDao.saveSKU(sku);
    }

   /* @GetMapping("/sku-id")
    public List<String> getAllSkuIds() {
        return skuDao.getAllSkuIds();
    }*/
    
    @GetMapping("/sku-cat")
    public List<String> getAllCategories(){
    	return skuDao.getAllCategories();
    	
    }
    
    @GetMapping("/sku-cat/{category}")
    public List<String> getSKUIdByCategory(@PathVariable String category){
    	return  skuDao.getSkuIdByCategory(category);
    	
    }
}