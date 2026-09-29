package edu.infosys.inventoryApplication.dao;

import java.util.List;

import edu.infosys.inventoryApplication.bean.SKU;

public interface SkuDao {
	
	public void saveSKU(SKU sku);
	public List<SKU> getAllSKUs();
	public SKU getSKUById(String id);
	public void deleteSKUById(String id);
//	public List<String>getAllSkuIds();
	public List<String> getAllCategories();
	public List<String> getSkuIdByCategory(String category);

}