package edu.infosys.inventoryApplication.bean;

public class ProductSale {
     private String productName;
     private Double totalSaleValue;
     
	 public ProductSale() {
		super();
		// TODO Auto-generated constructor stub
	}

	 public ProductSale(String productName, Double totalSaleValue) {
		super();
		this.productName = productName;
		this.totalSaleValue = totalSaleValue;
	 }

	 public String getProductName() {
		 return productName;
	 }

	 public void setProductName(String productName) {
		 this.productName = productName;
	 }

	 public Double getTotalSaleValue() {
		 return totalSaleValue;
	 }

	 public void setTotalSaleValue(Double totalSaleValue) {
		 this.totalSaleValue = totalSaleValue;
	 }
     
}
