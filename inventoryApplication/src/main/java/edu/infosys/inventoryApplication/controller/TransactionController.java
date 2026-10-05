package edu.infosys.inventoryApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.inventoryApplication.bean.ProductSale;
import edu.infosys.inventoryApplication.bean.Transaction;
import edu.infosys.inventoryApplication.dao.TransactionDao;
import edu.infosys.inventoryApplication.service.TransactionService;

@RestController
@RequestMapping("/invent/")
public class TransactionController {
  @Autowired
   private TransactionDao transactionDao;
  
  @Autowired
  private TransactionService service;
  
  @PostMapping("/stock")
  public void saveTransaction(@RequestBody Transaction transaction) {
	  transactionDao.saveTransaction(transaction);
  }
  
  @GetMapping("/stock/{id}")
  public Transaction findTransactionById(@PathVariable String id) {
  return transactionDao.findTransactionById(id);
}

  @DeleteMapping("/stock/{id}")
  public void removeTransactionById(@PathVariable String id ) {
	  transactionDao.removeTransactionById(id);
  }
  
  @GetMapping("/trans-id/{flag}")
  public String generateId(@PathVariable int flag) {
	  return service.generatedId(flag);
  }
  
  @GetMapping("/trans/{type}")
  public List<Transaction> findTransactionByType(@PathVariable String type){
	  return transactionDao.findTransactionByType(type);
  }
  @GetMapping("/analysis/{id}")
 public List<Double> getDemandByProduct(@PathVariable String id){
	 return transactionDao.getDemandByProduct(id);
 }
 
 @GetMapping("/analysis")
 public List<ProductSale> getProductWiseTotalSale(){
	 return  service.getProductWiseTotalSale();
 }
 

}