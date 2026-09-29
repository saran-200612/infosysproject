
package edu.infosys.inventoryApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.inventoryApplication.bean.ProductSale;
import edu.infosys.inventoryApplication.dao.TransactionDao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class TransactionService {
   @Autowired
   private TransactionDao transactionDao;
   
   public String generatedId(int flag) {
	   String type="";
	   if(flag==1)
		   type="IN";
	   else if(flag==2)
		   type="OUT";
	   String id=transactionDao.findMaxTransactionIdByType(type);
	    
	   if(id==null&& type.equalsIgnoreCase("IN")) {
		   id="IN100001";
		   }
	   else if(id==null && type.equalsIgnoreCase("OUT")) {
		   id="OT100001";
	   }
	   else if(id!=null && type.equalsIgnoreCase("IN")) {
		   int x=Integer.parseInt(id.substring(2));
		   x++;
		   id="IN"+x;
		  }
	   else if(id!=null && type.equalsIgnoreCase("OUT")) {
		   int x=Integer.parseUnsignedInt(id.substring(2));
	       x++;
	       id="OT"+x;
	   }
	   return id;
	   
			   
   }

   public List<ProductSale> getProductWiseTotalSale(){
	    List<ProductSale> salesList = transactionDao.getProductWiseTotalSale();
	    HashMap<String, ProductSale> salesMap = new HashMap<String, ProductSale>();

	    for(ProductSale prod : salesList) {
	        if(salesMap.containsKey(prod.getProductName())) {
	            Double val = salesMap.get(prod.getProductName()).getTotalSaleValue();
	            val = val + prod.getTotalSaleValue();
	            prod.setTotalSaleValue(val);
	            salesMap.put(prod.getProductName(), prod);
	        } else {
	            salesMap.put(prod.getProductName(), prod);
	        }
	    }

	    List<ProductSale> newList = new ArrayList<ProductSale>();
	    salesMap.forEach((k, v) -> newList.add(v));
	    return newList;
	}
   
   
}