package bouquet.infrastructure.datasource.autogen.orders;

import bouquet.domain.model.autogen.orders.Customer;
import org.apache.ibatis.annotations.*;

public interface CustomerMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table orders.customer
     *
     * @mbg.generated
     */
    @Delete({
            "delete from orders.customer",
            "where customer_number = #{customerNumber,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer customerNumber);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table orders.customer
     *
     * @mbg.generated
     */
    @Insert({
            "insert into orders.customer (customer_number, customer_code, ",
            "created_by, created_at, ",
            "user_id, first_name, ",
            "last_name, email, ",
            "birthday, gender, zip, ",
            "prefecture, address_1, ",
            "address_2, telephone_number, ",
            "withdraw)",
            "values (#{customerNumber,jdbcType=INTEGER}, #{customerCode,jdbcType=VARCHAR}, ",
            "#{createdBy,jdbcType=VARCHAR}, #{createdAt,jdbcType=TIMESTAMP}, ",
            "#{userId,jdbcType=VARCHAR}, #{firstName,jdbcType=VARCHAR}, ",
            "#{lastName,jdbcType=VARCHAR}, #{email,jdbcType=VARCHAR}, ",
            "#{birthday,jdbcType=DATE}, #{gender,jdbcType=VARCHAR}, #{zip,jdbcType=VARCHAR}, ",
            "#{prefecture,jdbcType=VARCHAR}, #{address1,jdbcType=VARCHAR}, ",
            "#{address2,jdbcType=VARCHAR}, #{telephoneNumber,jdbcType=VARCHAR}, ",
            "#{withdraw,jdbcType=DATE})"
    })
    int insert(Customer record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table orders.customer
     *
     * @mbg.generated
     */
    int insertSelective(Customer record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table orders.customer
     *
     * @mbg.generated
     */
    @Select({
            "select",
            "customer_number, customer_code, created_by, created_at, user_id, first_name, ",
            "last_name, email, birthday, gender, zip, prefecture, address_1, address_2, telephone_number, ",
            "withdraw",
            "from orders.customer",
            "where customer_number = #{customerNumber,jdbcType=INTEGER}"
    })
    @ResultMap("bouquet.infrastructure.datasource.autogen.orders.CustomerMapper.BaseResultMap")
    Customer selectByPrimaryKey(Integer customerNumber);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table orders.customer
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(Customer record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table orders.customer
     *
     * @mbg.generated
     */
    @Update({
            "update orders.customer",
            "set customer_code = #{customerCode,jdbcType=VARCHAR},",
            "created_by = #{createdBy,jdbcType=VARCHAR},",
            "created_at = #{createdAt,jdbcType=TIMESTAMP},",
            "user_id = #{userId,jdbcType=VARCHAR},",
            "first_name = #{firstName,jdbcType=VARCHAR},",
            "last_name = #{lastName,jdbcType=VARCHAR},",
            "email = #{email,jdbcType=VARCHAR},",
            "birthday = #{birthday,jdbcType=DATE},",
            "gender = #{gender,jdbcType=VARCHAR},",
            "zip = #{zip,jdbcType=VARCHAR},",
            "prefecture = #{prefecture,jdbcType=VARCHAR},",
            "address_1 = #{address1,jdbcType=VARCHAR},",
            "address_2 = #{address2,jdbcType=VARCHAR},",
            "telephone_number = #{telephoneNumber,jdbcType=VARCHAR},",
            "withdraw = #{withdraw,jdbcType=DATE}",
            "where customer_number = #{customerNumber,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Customer record);
}