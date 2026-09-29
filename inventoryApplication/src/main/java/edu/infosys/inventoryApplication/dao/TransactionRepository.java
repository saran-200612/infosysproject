package edu.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.inventoryApplication.bean.ProductSale;
import edu.infosys.inventoryApplication.bean.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction,String> {
   @Query("select max(a.transactionId) from Transaction a where a.transactionType=?1") 
   public String findMaxTransactionIdByType(String type);
   
   @Query("select a from Transaction a where a.transactionType=?1")
   public List<Transaction> findTransactionByType(String type);

   @Query("SELECT new edu.infosys.inventoryApplication.bean.ProductSale(p.productName, SUM(s.transactionValue)) " +
           "FROM Product p JOIN Transaction s ON p.productId = s.productId " +
           "WHERE s.transactionType='OUT' GROUP BY p.productId")
 public List<ProductSale> getProductWiseTotalSale();




@Query("SELECT s.transactionValue from Transaction s WHERE s.transactionType='OUT' and s.productId=?1")
 public List<Double> getDemandByProduct(String productId);


}
