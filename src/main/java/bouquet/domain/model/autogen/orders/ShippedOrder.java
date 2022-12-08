package bouquet.domain.model.autogen.orders;

import java.util.Date;

public class ShippedOrder {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column orders.shipped_order.shipping_number
     *
     * @mbg.generated
     */
    private Integer shippingNumber;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column orders.shipped_order.shipping_date
     *
     * @mbg.generated
     */
    private Date shippingDate;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column orders.shipped_order.customer_number
     *
     * @mbg.generated
     */
    private Integer customerNumber;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column orders.shipped_order.created_by
     *
     * @mbg.generated
     */
    private String createdBy;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column orders.shipped_order.created_at
     *
     * @mbg.generated
     */
    private Date createdAt;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column orders.shipped_order.shipping_number
     *
     * @return the value of orders.shipped_order.shipping_number
     * @mbg.generated
     */
    public Integer getShippingNumber() {
        return shippingNumber;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column orders.shipped_order.shipping_number
     *
     * @param shippingNumber the value for orders.shipped_order.shipping_number
     * @mbg.generated
     */
    public void setShippingNumber(Integer shippingNumber) {
        this.shippingNumber = shippingNumber;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column orders.shipped_order.shipping_date
     *
     * @return the value of orders.shipped_order.shipping_date
     * @mbg.generated
     */
    public Date getShippingDate() {
        return shippingDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column orders.shipped_order.shipping_date
     *
     * @param shippingDate the value for orders.shipped_order.shipping_date
     * @mbg.generated
     */
    public void setShippingDate(Date shippingDate) {
        this.shippingDate = shippingDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column orders.shipped_order.customer_number
     *
     * @return the value of orders.shipped_order.customer_number
     * @mbg.generated
     */
    public Integer getCustomerNumber() {
        return customerNumber;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column orders.shipped_order.customer_number
     *
     * @param customerNumber the value for orders.shipped_order.customer_number
     * @mbg.generated
     */
    public void setCustomerNumber(Integer customerNumber) {
        this.customerNumber = customerNumber;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column orders.shipped_order.created_by
     *
     * @return the value of orders.shipped_order.created_by
     * @mbg.generated
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column orders.shipped_order.created_by
     *
     * @param createdBy the value for orders.shipped_order.created_by
     * @mbg.generated
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column orders.shipped_order.created_at
     *
     * @return the value of orders.shipped_order.created_at
     * @mbg.generated
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column orders.shipped_order.created_at
     *
     * @param createdAt the value for orders.shipped_order.created_at
     * @mbg.generated
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
