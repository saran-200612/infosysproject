package edu.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.inventoryApplication.bean.Product;

public interface ProductRepository extends JpaRepository<Product, String> {
	@Query("select max(productId) from Product")
	public String getMaxProductId();
	
	@Query("select reorderLevel from Product where productId=?1")
	public Double getReorderLevelByProductId(String id);
	
	@Query("select p from Product p where p.vendorId=?1")
	public List<Product> getProductByVendor(String vendorId);
 

}