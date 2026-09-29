package edu.infosys.inventoryApplication.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import edu.infosys.inventoryApplication.bean.SKU;

public interface SkuRepository extends JpaRepository<SKU,String> {

   /* @Query("select skuId from SKU")
    public List<String> getAllSkuIds();*/
	  @Query("select DISTINCT category from SKU")
	    public List<String> getALLCategories();
    
    @Query("select skuId from SKU where category=?1 ")
    public List<String> getSkuIdByCategory(String category);
}