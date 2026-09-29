package edu.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.infosys.inventoryApplication.bean.ProductSale;
import edu.infosys.inventoryApplication.bean.Transaction;

@Repository
public class TransactionDaoImpl implements TransactionDao {

    @Autowired
    private TransactionRepository transactionRepository;

    
    @Override
    public void saveTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }

   
    @Override
    public Transaction findTransactionById(String id) {
        return transactionRepository.findById(id).orElse(null);
    }

    
    @Override
    public String findMaxTransactionIdByType(String type) {
        return transactionRepository.findMaxTransactionIdByType(type);
    }

    
    @Override
    public List<Transaction> findTransactionByType(String type) {
        return transactionRepository.findTransactionByType(type);
    }

   
    @Override
    public void removeTransactionById(String id) {
        transactionRepository.deleteById(id);
        
        
    }
    
    @Override
    public List<Double> getDemandByProduct(String productId){
    	return transactionRepository.getDemandByProduct(productId);
    }
    
    @Override
    public List<ProductSale> getProductWiseTotalSale(){
    	return transactionRepository.getProductWiseTotalSale();
    }
}