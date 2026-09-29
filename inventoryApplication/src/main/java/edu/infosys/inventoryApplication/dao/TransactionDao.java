package edu.infosys.inventoryApplication.dao;

import java.util.List;

import edu.infosys.inventoryApplication.bean.ProductSale;
import edu.infosys.inventoryApplication.bean.Transaction;

public interface TransactionDao {
	public void saveTransaction(Transaction transaction);
	public Transaction findTransactionById(String id);
	public String findMaxTransactionIdByType(String type);
	public List<Transaction> findTransactionByType(String type);
	public void removeTransactionById(String id);
    public List<Double> getDemandByProduct(String productId);
    public List<ProductSale> getProductWiseTotalSale();
	
}
