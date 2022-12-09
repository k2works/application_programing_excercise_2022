package bouquet.infrastructure.datasource.autogen.orders;

import bouquet.domain.model.autogen.orders.ShippedOrderLine;
import org.apache.ibatis.annotations.*;

public interface ShippedOrderLineMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table orders.shipped_order_line
     *
     * @mbg.generated
     */
    @Delete({
            "delete from orders.shipped_order_line",
            "where shipping_number = #{shippingNumber,jdbcType=INTEGER}",
            "and shipping_line_number = #{shippingLineNumber,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(@Param("shippingNumber") Integer shippingNumber, @Param("shippingLineNumber") Integer shippingLineNumber);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table orders.shipped_order_line
     *
     * @mbg.generated
     */
    @Insert({
            "insert into orders.shipped_order_line (shipping_number, shipping_line_number, ",
            "product_number, product_name, ",
            "order_number, order_line_number, ",
            "quantity, created_by, ",
            "created_at)",
            "values (#{shippingNumber,jdbcType=INTEGER}, #{shippingLineNumber,jdbcType=INTEGER}, ",
            "#{productNumber,jdbcType=INTEGER}, #{productName,jdbcType=VARCHAR}, ",
            "#{orderNumber,jdbcType=INTEGER}, #{orderLineNumber,jdbcType=INTEGER}, ",
            "#{quantity,jdbcType=INTEGER}, #{createdBy,jdbcType=VARCHAR}, ",
            "#{createdAt,jdbcType=TIMESTAMP})"
    })
    int insert(ShippedOrderLine record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table orders.shipped_order_line
     *
     * @mbg.generated
     */
    int insertSelective(ShippedOrderLine record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table orders.shipped_order_line
     *
     * @mbg.generated
     */
    @Select({
            "select",
            "shipping_number, shipping_line_number, product_number, product_name, order_number, ",
            "order_line_number, quantity, created_by, created_at",
            "from orders.shipped_order_line",
            "where shipping_number = #{shippingNumber,jdbcType=INTEGER}",
            "and shipping_line_number = #{shippingLineNumber,jdbcType=INTEGER}"
    })
    @ResultMap("bouquet.infrastructure.datasource.autogen.orders.ShippedOrderLineMapper.BaseResultMap")
    ShippedOrderLine selectByPrimaryKey(@Param("shippingNumber") Integer shippingNumber, @Param("shippingLineNumber") Integer shippingLineNumber);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table orders.shipped_order_line
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(ShippedOrderLine record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table orders.shipped_order_line
     *
     * @mbg.generated
     */
    @Update({
            "update orders.shipped_order_line",
            "set product_number = #{productNumber,jdbcType=INTEGER},",
            "product_name = #{productName,jdbcType=VARCHAR},",
            "order_number = #{orderNumber,jdbcType=INTEGER},",
            "order_line_number = #{orderLineNumber,jdbcType=INTEGER},",
            "quantity = #{quantity,jdbcType=INTEGER},",
            "created_by = #{createdBy,jdbcType=VARCHAR},",
            "created_at = #{createdAt,jdbcType=TIMESTAMP}",
            "where shipping_number = #{shippingNumber,jdbcType=INTEGER}",
            "and shipping_line_number = #{shippingLineNumber,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(ShippedOrderLine record);
}