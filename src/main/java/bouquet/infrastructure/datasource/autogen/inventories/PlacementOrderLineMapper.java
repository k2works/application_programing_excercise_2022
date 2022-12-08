package bouquet.infrastructure.datasource.autogen.inventories;

import bouquet.domain.model.autogen.inventories.PlacementOrderLine;
import org.apache.ibatis.annotations.*;

public interface PlacementOrderLineMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.placement_order_line
     *
     * @mbg.generated
     */
    @Delete({
            "delete from inventories.placement_order_line",
            "where placement_order_number = #{placementOrderNumber,jdbcType=INTEGER}",
            "and placement_order_line_number = #{placementOrderLineNumber,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(@Param("placementOrderNumber") Integer placementOrderNumber, @Param("placementOrderLineNumber") Integer placementOrderLineNumber);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.placement_order_line
     *
     * @mbg.generated
     */
    @Insert({
            "insert into inventories.placement_order_line (placement_order_number, placement_order_line_number, ",
            "product_number, product_name, ",
            "cost_price, placement_order_line_quantity, ",
            "arrived_quantity, complete, ",
            "created_by, created_at)",
            "values (#{placementOrderNumber,jdbcType=INTEGER}, #{placementOrderLineNumber,jdbcType=INTEGER}, ",
            "#{productNumber,jdbcType=INTEGER}, #{productName,jdbcType=VARCHAR}, ",
            "#{costPrice,jdbcType=NUMERIC}, #{placementOrderLineQuantity,jdbcType=INTEGER}, ",
            "#{arrivedQuantity,jdbcType=INTEGER}, #{complete,jdbcType=INTEGER}, ",
            "#{createdBy,jdbcType=VARCHAR}, #{createdAt,jdbcType=TIMESTAMP})"
    })
    int insert(PlacementOrderLine record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.placement_order_line
     *
     * @mbg.generated
     */
    int insertSelective(PlacementOrderLine record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.placement_order_line
     *
     * @mbg.generated
     */
    @Select({
            "select",
            "placement_order_number, placement_order_line_number, product_number, product_name, ",
            "cost_price, placement_order_line_quantity, arrived_quantity, complete, created_by, ",
            "created_at",
            "from inventories.placement_order_line",
            "where placement_order_number = #{placementOrderNumber,jdbcType=INTEGER}",
            "and placement_order_line_number = #{placementOrderLineNumber,jdbcType=INTEGER}"
    })
    @ResultMap("bouquet.infrastructure.datasource.autogen.inventories.PlacementOrderLineMapper.BaseResultMap")
    PlacementOrderLine selectByPrimaryKey(@Param("placementOrderNumber") Integer placementOrderNumber, @Param("placementOrderLineNumber") Integer placementOrderLineNumber);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.placement_order_line
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(PlacementOrderLine record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.placement_order_line
     *
     * @mbg.generated
     */
    @Update({
            "update inventories.placement_order_line",
            "set product_number = #{productNumber,jdbcType=INTEGER},",
            "product_name = #{productName,jdbcType=VARCHAR},",
            "cost_price = #{costPrice,jdbcType=NUMERIC},",
            "placement_order_line_quantity = #{placementOrderLineQuantity,jdbcType=INTEGER},",
            "arrived_quantity = #{arrivedQuantity,jdbcType=INTEGER},",
            "complete = #{complete,jdbcType=INTEGER},",
            "created_by = #{createdBy,jdbcType=VARCHAR},",
            "created_at = #{createdAt,jdbcType=TIMESTAMP}",
            "where placement_order_number = #{placementOrderNumber,jdbcType=INTEGER}",
            "and placement_order_line_number = #{placementOrderLineNumber,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(PlacementOrderLine record);
}
