package edu.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.infosys.inventoryApplication.bean.SKU;

@Repository
public class SkuDaoImpl implements SkuDao {

    @Autowired
    private SkuRepository repository;

    @Override
    public void saveSKU(SKU sku) {
        repository.save(sku);
    }

    @Override
    public List<SKU> getAllSKUs() {
        return repository.findAll();
    }

    @Override
    public SKU getSKUById(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void deleteSKUById(String id) {
        repository.deleteById(id);
    }

    /*
    public List<String> getAllSkuIds(){
        return repository.getAllSkuIds();
    }
    */

    @Override
    public List<String> getAllCategories() {
        return repository.getALLCategories();
    }

    @Override
    public List<String> getSkuIdByCategory(String category) {
        return repository.getSkuIdByCategory(category);
    }
}