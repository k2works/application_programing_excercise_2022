package bouquet.infrastructure.datasource.autogen.inventories;

import bouquet.domain.model.autogen.inventories.Inventory;
import org.apache.ibatis.annotations.*;

public interface InventoryMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.inventory
     *
     * @mbg.generated
     */
    @Delete({
            "delete from inventories.inventory",
            "where product_number = #{productNumber,jdbcType=INTEGER}",
            "and lot_number = #{lotNumber,jdbcType=INTEGER}",
            "and inventory_type = #{inventoryType,jdbcType=VARCHAR}"
    })
    int deleteByPrimaryKey(@Param("productNumber") Integer productNumber, @Param("lotNumber") Integer lotNumber, @Param("inventoryType") String inventoryType);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.inventory
     *
     * @mbg.generated
     */
    @Insert({
            "insert into inventories.inventory (product_number, lot_number, ",
            "inventory_type, inventory_quantity, ",
            "created_by, created_at)",
            "values (#{productNumber,jdbcType=INTEGER}, #{lotNumber,jdbcType=INTEGER}, ",
            "#{inventoryType,jdbcType=VARCHAR}, #{inventoryQuantity,jdbcType=INTEGER}, ",
            "#{createdBy,jdbcType=VARCHAR}, #{createdAt,jdbcType=TIMESTAMP})"
    })
    int insert(Inventory record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.inventory
     *
     * @mbg.generated
     */
    int insertSelective(Inventory record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.inventory
     *
     * @mbg.generated
     */
    @Select({
            "select",
            "product_number, lot_number, inventory_type, inventory_quantity, created_by, ",
            "created_at",
            "from inventories.inventory",
            "where product_number = #{productNumber,jdbcType=INTEGER}",
            "and lot_number = #{lotNumber,jdbcType=INTEGER}",
            "and inventory_type = #{inventoryType,jdbcType=VARCHAR}"
    })
    @ResultMap("bouquet.infrastructure.datasource.autogen.inventories.InventoryMapper.BaseResultMap")
    Inventory selectByPrimaryKey(@Param("productNumber") Integer productNumber, @Param("lotNumber") Integer lotNumber, @Param("inventoryType") String inventoryType);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.inventory
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(Inventory record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.inventory
     *
     * @mbg.generated
     */
    @Update({
            "update inventories.inventory",
            "set inventory_quantity = #{inventoryQuantity,jdbcType=INTEGER},",
            "created_by = #{createdBy,jdbcType=VARCHAR},",
            "created_at = #{createdAt,jdbcType=TIMESTAMP}",
            "where product_number = #{productNumber,jdbcType=INTEGER}",
            "and lot_number = #{lotNumber,jdbcType=INTEGER}",
            "and inventory_type = #{inventoryType,jdbcType=VARCHAR}"
    })
    int updateByPrimaryKey(Inventory record);
}
