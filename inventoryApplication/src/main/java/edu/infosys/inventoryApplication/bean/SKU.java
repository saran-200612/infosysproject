package edu.infosys.inventoryApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class SKU {

    @Id
    private String skuId;
    private String skuDescription;
    private String category;   // ADD THIS LINE

    public SKU() {}

    public SKU(String skuId, String skuDescription, String category) {
        this.skuId = skuId;
        this.skuDescription = skuDescription;
        this.category = category;
    }

    public String getSkuId() { 
        return skuId; 
    }

    public void setSkuId(String skuId) { 
        this.skuId = skuId; 
    }

    public String getSkuDescription() { 
        return skuDescription; 
    }

    public void setSkuDescription(String skuDescription) { 
        this.skuDescription = skuDescription; 
    }

    public String getCategory() { 
        return category; 
    }

    public void setCategory(String category) { 
        this.category = category; 
    }
}