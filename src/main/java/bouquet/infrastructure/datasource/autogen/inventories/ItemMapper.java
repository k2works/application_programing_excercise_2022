package bouquet.infrastructure.datasource.autogen.inventories;

import bouquet.domain.model.autogen.inventories.Item;
import org.apache.ibatis.annotations.*;

public interface ItemMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.item
     *
     * @mbg.generated
     */
    @Delete({
            "delete from inventories.item",
            "where product_number = #{productNumber,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer productNumber);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.item
     *
     * @mbg.generated
     */
    @Insert({
            "insert into inventories.item (product_number, item_number, ",
            "item_code, quantity, ",
            "created_by, created_at)",
            "values (#{productNumber,jdbcType=INTEGER}, #{itemNumber,jdbcType=INTEGER}, ",
            "#{itemCode,jdbcType=VARCHAR}, #{quantity,jdbcType=INTEGER}, ",
            "#{createdBy,jdbcType=VARCHAR}, #{createdAt,jdbcType=TIMESTAMP})"
    })
    int insert(Item record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.item
     *
     * @mbg.generated
     */
    int insertSelective(Item record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.item
     *
     * @mbg.generated
     */
    @Select({
            "select",
            "product_number, item_number, item_code, quantity, created_by, created_at",
            "from inventories.item",
            "where product_number = #{productNumber,jdbcType=INTEGER}"
    })
    @ResultMap("bouquet.infrastructure.datasource.autogen.inventories.ItemMapper.BaseResultMap")
    Item selectByPrimaryKey(Integer productNumber);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.item
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(Item record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table inventories.item
     *
     * @mbg.generated
     */
    @Update({
            "update inventories.item",
            "set item_number = #{itemNumber,jdbcType=INTEGER},",
            "item_code = #{itemCode,jdbcType=VARCHAR},",
            "quantity = #{quantity,jdbcType=INTEGER},",
            "created_by = #{createdBy,jdbcType=VARCHAR},",
            "created_at = #{createdAt,jdbcType=TIMESTAMP}",
            "where product_number = #{productNumber,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Item record);
}