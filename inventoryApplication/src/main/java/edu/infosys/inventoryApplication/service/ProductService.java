package edu.infosys.inventoryApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.inventoryApplication.bean.Product;
import edu.infosys.inventoryApplication.dao.ProductDao;

@Service
public class ProductService {

    @Autowired
    private ProductDao productDao;

    public String generateProductId() {
        String id = productDao.getMaxProductId();

        if (id == null)
            id = "P10001";
        else {
            int x = Integer.parseInt(id.substring(1));
            x++;
            id = "P" + x;
        }

        return id;
    }

    public Product setSalesPrice(Product product) {
        double purchasePrice = product.getPurchasePrice();
        double salesPrice = purchasePrice + purchasePrice * 0.20;
        product.setSalesPrice(salesPrice);
        return product;
    }

    public String stockChecking(Product product) {

        double stock = product.getStock();
        double rol = product.getReorderLevel();

        Boolean answer;

        if (stock > rol)
            answer = true;
        else
            answer = false;

        return answer.toString();
    }

    public Product stockEdit(Product product, Double qty, int flag) {

        double stock = product.getStock();
        double rol = product.getReorderLevel();
        boolean status = product.getStatus();

        if (flag == 2)
            stock = stock - qty;
        else if (flag == 1)
            stock = stock + qty;

        if (stock > rol)
            status = true;
        else
            status = false;

        product.setStock(stock);
        product.setStatus(status);

        return product;
    }
}