package bouquet.domain.model.autogen.inventories;

import java.util.Date;

public class PurchaseLine {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column inventories.purchase_line.purchase_number
     *
     * @mbg.generated
     */
    private Integer purchaseNumber;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column inventories.purchase_line.purchase_line_number
     *
     * @mbg.generated
     */
    private Integer purchaseLineNumber;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column inventories.purchase_line.product_number
     *
     * @mbg.generated
     */
    private Integer productNumber;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column inventories.purchase_line.product_name
     *
     * @mbg.generated
     */
    private String productName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column inventories.purchase_line.purchase_price
     *
     * @mbg.generated
     */
    private Integer purchasePrice;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column inventories.purchase_line.purchase_quantity
     *
     * @mbg.generated
     */
    private Integer purchaseQuantity;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column inventories.purchase_line.created_by
     *
     * @mbg.generated
     */
    private String createdBy;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column inventories.purchase_line.created_at
     *
     * @mbg.generated
     */
    private Date createdAt;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column inventories.purchase_line.purchase_number
     *
     * @return the value of inventories.purchase_line.purchase_number
     * @mbg.generated
     */
    public Integer getPurchaseNumber() {
        return purchaseNumber;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column inventories.purchase_line.purchase_number
     *
     * @param purchaseNumber the value for inventories.purchase_line.purchase_number
     * @mbg.generated
     */
    public void setPurchaseNumber(Integer purchaseNumber) {
        this.purchaseNumber = purchaseNumber;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column inventories.purchase_line.purchase_line_number
     *
     * @return the value of inventories.purchase_line.purchase_line_number
     * @mbg.generated
     */
    public Integer getPurchaseLineNumber() {
        return purchaseLineNumber;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column inventories.purchase_line.purchase_line_number
     *
     * @param purchaseLineNumber the value for inventories.purchase_line.purchase_line_number
     * @mbg.generated
     */
    public void setPurchaseLineNumber(Integer purchaseLineNumber) {
        this.purchaseLineNumber = purchaseLineNumber;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column inventories.purchase_line.product_number
     *
     * @return the value of inventories.purchase_line.product_number
     * @mbg.generated
     */
    public Integer getProductNumber() {
        return productNumber;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column inventories.purchase_line.product_number
     *
     * @param productNumber the value for inventories.purchase_line.product_number
     * @mbg.generated
     */
    public void setProductNumber(Integer productNumber) {
        this.productNumber = productNumber;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column inventories.purchase_line.product_name
     *
     * @return the value of inventories.purchase_line.product_name
     * @mbg.generated
     */
    public String getProductName() {
        return productName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column inventories.purchase_line.product_name
     *
     * @param productName the value for inventories.purchase_line.product_name
     * @mbg.generated
     */
    public void setProductName(String productName) {
        this.productName = productName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column inventories.purchase_line.purchase_price
     *
     * @return the value of inventories.purchase_line.purchase_price
     * @mbg.generated
     */
    public Integer getPurchasePrice() {
        return purchasePrice;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column inventories.purchase_line.purchase_price
     *
     * @param purchasePrice the value for inventories.purchase_line.purchase_price
     * @mbg.generated
     */
    public void setPurchasePrice(Integer purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column inventories.purchase_line.purchase_quantity
     *
     * @return the value of inventories.purchase_line.purchase_quantity
     * @mbg.generated
     */
    public Integer getPurchaseQuantity() {
        return purchaseQuantity;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column inventories.purchase_line.purchase_quantity
     *
     * @param purchaseQuantity the value for inventories.purchase_line.purchase_quantity
     * @mbg.generated
     */
    public void setPurchaseQuantity(Integer purchaseQuantity) {
        this.purchaseQuantity = purchaseQuantity;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column inventories.purchase_line.created_by
     *
     * @return the value of inventories.purchase_line.created_by
     * @mbg.generated
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column inventories.purchase_line.created_by
     *
     * @param createdBy the value for inventories.purchase_line.created_by
     * @mbg.generated
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column inventories.purchase_line.created_at
     *
     * @return the value of inventories.purchase_line.created_at
     * @mbg.generated
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column inventories.purchase_line.created_at
     *
     * @param createdAt the value for inventories.purchase_line.created_at
     * @mbg.generated
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
