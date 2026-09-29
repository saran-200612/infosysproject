package edu.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.infosys.inventoryApplication.bean.Product;

@Repository
public class ProductDaoImpl implements ProductDao {

    @Autowired
    private ProductRepository repository;

    @Override
    public void saveProduct(Product product) {
        repository.save(product);
    }

    @Override
    public List<Product> getAllProduct() {
        return repository.findAll();
    }

    @Override
    public Product getProductById(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void deleteProductById(String id) {
        repository.deleteById(id);
    }

    @Override
    public String getMaxProductId() {
        return repository.getMaxProductId();
    }

    @Override
    public Double getReorderLevelByProductId(String id) {
        return repository.getReorderLevelByProductId(id);
    }

    @Override
    public List<Product> getProductByVendor(String vendorId) {
        return repository.getProductByVendor(vendorId);
    }
}