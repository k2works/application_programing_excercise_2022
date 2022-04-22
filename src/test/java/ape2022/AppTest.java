/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package ape2022;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.IllegalFormatConversionException;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.time.*;

class AppTest {

    @Nested
    class 値と計算 {
        @Nested
        class 値と演算 {
            @Test
            void 整数() {
                assertEquals(7, 5 + 2);
                assertEquals(10, 5 * 2);
                assertEquals(3, 5 - 2);
                assertEquals(2, 5 / 2);
                assertEquals(14, 2 + 3 * 4);
                assertEquals(20, (2 + 3) * 4);
                assertEquals(1, 5 % 2);

            }

            @Test
            void 構文エラー() {

            }

            @Test
            void 実数() {
                assertEquals(7.0, 5.0 + 2);
                assertEquals(2.5, 5.0 / 2);

            }

            @Test
            void 文字列() {
                assertEquals("tester", "test" + "er");
                assertEquals("test123", "test" + "123");
                assertEquals("test123", "test" + 12 + 3);
                assertEquals("test15", "test" + (12 + 3));
                assertEquals("15test", 12 + 3 + "test");
                assertEquals("52", "5" + 2);

                assertEquals("文字列に\"を含む", "文字列に\"を含む");
                assertEquals("改行\nする", "改行\nする");

                var text = """
                        test
                        foo
                        """;
                assertEquals(text, "test\nfoo\n");

            }

            @Test
            void 例外() {

                CalcInterface calc = (a, b) -> a / b;
                assertThrows(ArithmeticException.class, () -> calc.div(3, 0));
            }
        }

        @Nested
        class メソッドの呼び出し {
            @Test
            void メソッドの呼び出し() {
                assertEquals("TEST", "TEST".toUpperCase());
                assertEquals(4, "test".length());
            }

            @Test
            void 文字列の掛け算や引き算() {
                assertEquals("testtesttest", "test".repeat(3));
                assertEquals("testtesttesttesttest", "test".repeat(5));
                assertEquals("tt", "test".replace("es", ""));
            }

            @Test
            void メソッドのシグネチャ() {

            }

            @Test
            void メソッドの使い方がわからないとき() {

            }

            @Test
            void 文字列のフォーマット() {

                assertEquals("test15", "test%s".formatted(12 + 3));
                assertEquals("testとsample", "%sと%s".formatted("test", "sample"));
                assertEquals("2+3=5", "%d+%d=%d".formatted(2, 3, 2 + 3));
                assertEquals("消費税抜き1,000円は消費税込みで1,100円", "消費税抜き%,d円は消費税込みで%,d円".formatted(1000, 1100));
            }

            @Test
            void formattedメソッドでの例外() {
                assertThrows(IllegalFormatConversionException.class, () -> "%d+%d".formatted("abc", "cde"));
            }
        }
    }

    @Nested
    class 変数と型 {
        @Nested
        class 変数 {
            @Test
            void 変数() {
                var t = "test";
                assertEquals("test", t);
                assertEquals("test3", t + "3");
                assertEquals("TEST", t.toUpperCase());
                t = "real";
                assertEquals("real3", t + "3");
                assertEquals("REAL", t.toUpperCase());
            }

            @Test
            void 複合代入演算子() {
                var n = 20;
                n *= 5;
                assertEquals(100, n);

                var c = "te";
                c += "st";
                assertEquals("test", c);

                n = 100;
                assertEquals(101, ++n);
                n = 100;
                assertEquals(100, n++);
            }

            @Test
            void 値に名前を付けるメリット() {
                var test = "test";
                assertEquals("test", test);
                assertEquals("TEST", test.toUpperCase());
                var rest = "rest";
                assertEquals("REST", rest.toUpperCase());
                var r10 = 11.75;
                assertEquals(11.75, r10);
                assertEquals(433.51625, r10 * r10 * 3.14);
                assertEquals(433.73613573624084, r10 * r10 * Math.PI);
            }

        }

        @Nested
        class 型 {
            @Test
            void 変数の型() {
                var t = "real";
                assertTrue(t instanceof String);
                var i = 5;
                assertTrue((Integer) i instanceof Integer);
            }

            @Test
            void 基本型と参照型() {
                String u = "myname";
                assertTrue(u instanceof String);
            }

            @Test
            void 文字を扱う型() {
                char ch = 48;
                assertEquals('0', ch);
                ch = '0' + 9;
                assertEquals('9', ch);
                assertEquals(8, '8' - '0');
                ch = 'A' + 32;
                assertEquals('a', ch);
            }

            @Test
            void 数値の型変換() throws ParseException {
                int i = 234;
                double d = i;
                assertEquals(234.0, d);
                int j = (int) d;
                assertEquals(234, j);
                d = 3.14;
                i = (int) d;
                assertEquals(3, i);
                d = i;
                assertEquals(3.0, d);
                assertEquals(-3, (int) -3.14);

                int a = Integer.parseInt("3");
                assertEquals(3, a);
                assertThrows(NumberFormatException.class, () -> Integer.parseInt("3a"));
                d = Double.parseDouble("12.3");
                assertEquals(12.3, d);
                assertEquals(12345, java.text.NumberFormat.getInstance().parse("12,345").intValue());

                String s = 123 + "";
                assertEquals("123", s);
                assertEquals("123", String.valueOf(123));
                assertEquals("12,345", "%,d".formatted(12345));
                assertEquals("12,345", java.text.NumberFormat.getInstance().format(12345));
            }

            @Test
            void 型の役割() {

            }

        }
    }

    @Nested
    class 標準API {
        @Nested
        class 日付時刻 {
            @Test
            void 現在日時を取得する() {
                var nowDay = java.time.LocalDate.now();
                // assertEquals(nowDay, java.time.LocalDate.now());
                var nowTime = java.time.LocalTime.now();
                // assertEquals(nowTime, java.time.LocalTime.now());
                var nowDateTime = java.time.LocalDateTime.now();
                // assertEquals(nowDateTime, java.time.LocalDateTime.now());
            }

            @Test
            void 日付時刻の操作() {
                var threeDaysAfter = LocalDate.now().plusDays(3);
                assertEquals(threeDaysAfter, LocalDate.now().plusDays(3));
                var today = LocalDateTime.now();
                var twoWeeksLater = today.plusWeeks(2);
                assertEquals(twoWeeksLater, today.plusWeeks(2));
                var twoHoursLater = today.plusHours(2);
                assertEquals(twoHoursLater, today.plusHours(2));
            }

            @Test
            void 指定した日付時刻を扱う() {
                var java17date = LocalDate.of(2021, 9, 14);
                assertEquals(java17date, LocalDate.of(2021, 9, 14));
                var java17time = LocalTime.of(14, 30);
                assertEquals(java17time, LocalTime.of(14, 30));
                var java17dateTime = LocalDateTime.of(java17date, java17time);
                assertEquals(java17dateTime, LocalDateTime.of(java17date, java17time));
                var java16dateTime = LocalDateTime.of(2021, 3, 16, 14, 30);
                assertEquals(java16dateTime, LocalDateTime.of(2021, 3, 16, 14, 30));
            }

            @Test
            void 日付時刻の整形() {
                assertEquals("06月", "%tm月".formatted(LocalDate.of(2021, 6, 1)));
                assertEquals("01時35分",
                        "%tH時%tM分".formatted(LocalDateTime.of(2021, 6, 1, 1, 35), LocalDateTime.of(2020, 6, 1, 1, 35)));
                assertEquals("01時35分",
                        "%tH時%<tM分".formatted(LocalDateTime.of(2022, 6, 1, 1, 35)));
                assertEquals("2021年06月25日", "%tY年%<tm月%<td日".formatted(LocalDate.of(2021, 6, 25)));
            }

            @Test
            void staticメソッドとインスタンスメソッド() {
                assertEquals("testとsample", String.format("%sと%s", "test", "sample"));
                assertEquals("みかん", "%sですよ".format("みかん"));
                assertEquals("みかんですよ", "%sですよ".formatted("みかん"));
            }
        }

        @Nested
        class BigDecimal_ {
            @Test
            void BigDecimalでの計算() {
                assertEquals(28.95, BigDecimal.valueOf(579).multiply(BigDecimal.valueOf(0.05)).doubleValue());
                var b579 = BigDecimal.valueOf(579);
                assertEquals(579, b579.doubleValue());
                var b005 = BigDecimal.valueOf(0.05);
                assertEquals(0.05, b005.doubleValue());
                assertEquals(28.95, b579.multiply(b005).doubleValue());
                var result = b579.divideAndRemainder(BigDecimal.valueOf(100));
                assertEquals(5, result[0].intValue());
                assertEquals(79, result[1].intValue());
            }

            @Test
            void newによるBigDecimalオブジェク生成() {
                assertEquals(3.141592653589793, BigDecimal.valueOf(3.141592653589793238).doubleValue());
                assertEquals(3.141592653589793238, new BigDecimal("3.141592653589793238").doubleValue());
            }

            @Test
            void BigDecimalオブジェク生成時の注意() {
                assertEquals(0.625, new BigDecimal(0.625).doubleValue());
            }
        }
    }

    @Nested
    class 条件分岐 {
        @Nested
        class 論理型 {
            @Test
            void 論理型() {
                assertTrue("test".contains("es"));
                assertFalse("test".contains("a"));
            }

            @Test
            void 値の比較() {
                assertTrue(3 < 4);
                assertFalse(4 < 3);
                assertTrue(4 == 4);
                assertFalse(3 == 4);
                assertFalse(4 != 4);
                assertTrue(3 != 4);
            }

            @Test
            void オブジェクトの大小比較() {
                assertEquals(-1, "apple".compareTo("banana"));
                var today = LocalDate.of(2021, 9, 24);
                var java17 = LocalDate.of(2021, 9, 14);
                assertEquals(10, today.compareTo(java17));
                assertTrue(today.isAfter(java17));
                assertFalse(today.isBefore(java17));
            }

            @Test
            void オブジェクトが等しいかどうかの比較() {
                assertTrue("test" == "test");
                assertFalse("test" == "TEST");
                var str = "TEST".toLowerCase();
                assertFalse(str == "test");
                assertTrue(str.equals("test"));
                var java17 = LocalDate.of(2021, 9, 14);
                assertFalse(java17.plusDays(5) == LocalDate.of(2021, 9, 19));
                assertTrue(java17.plusDays(5).equals(LocalDate.of(2021, 9, 19)));
            }

            @Test
            void 論理演算子() {
                assertTrue(true || false);
                assertFalse(false || false);
                assertTrue(true && true);
                assertFalse(true && false);
                var a = 5;
                assertTrue(3 <= a && a <= 7);
                a = 1;
                assertFalse(3 <= a && a <= 7);
                a = 8;
                assertFalse(3 <= a && a <= 7);
                assertTrue(a < 3 || 7 < a);
                a = 1;
                assertTrue(a < 3 || 7 < a);
                a = 5;
                assertFalse(a < 3 || 7 < a);
                assertFalse(!true);
                assertTrue(!false);
                assertFalse(!"test".contains("es"));
                assertTrue(!"test".contains("a"));
            }

            @Test
            void 条件演算子() {
                var a = 3;
                assertEquals("small", a < 5 ? "small" : "big");
                a = 7;
                assertEquals("big", a < 5 ? "small" : "big");
                assertEquals("high", a < 3 ? "low" : a < 7 ? "middle" : "high");
                var message = a < 3 ? "low" : a < 7 ? "middle" : "high";
                assertEquals("high", message);
            }
        }

        @Nested
        class if文による条件分岐 {
            @Test
            void if文() {
                StateMentInterface ifState = (args) -> {
                    var a = 2;
                    if (a < 3) {
                        return "小さい";
                    }
                    return "大きい";
                };

                assertEquals("小さい", ifState.main(new String[0]));
            }

            @Test
            void else句() {
                StateMentInterface elseState = (args) -> {
                    var a = 2;
                    if (a < 3) {
                        return "小さい";
                    } else {
                        return "大きい";
                    }
                };

                assertEquals("小さい", elseState.main(new String[0]));
            }

            @Test
            void elseIf句() {
                StateMentInterface elseIfState = (args) -> {
                    var a = 2;
                    if (a < 3) {
                        return "小さい";
                    } else if (a < 3) {
                        return "中くらい";
                    } else {
                        return "大きい";
                    }
                };

                assertEquals("小さい", elseIfState.main(new String[0]));
            }
        }

        @Nested
        class switchによる条件分岐 {
            @Test
            void swith式() {
                StateMentInterface switchState = (args) -> {
                    var a = 3;
                    return switch (a) {
                        case 1, 2 -> "one-two";
                        case 3 -> "three";
                        case 4 -> "four";
                        default -> "other";
                    };
                };

                assertEquals("three", switchState.main(new String[0]));
            }
        }
    }

    @Nested
    class データ構造 {
        @Nested
        class Listで値をまとめる {
            @Test
            void List() {
                var names = List.of("yamamoto", "kishida", "sugiyama");
                assertEquals("[yamamoto, kishida, sugiyama]", names.toString());
                assertEquals("kishida", names.get(1));
                assertEquals("yamamoto", names.get(0));
                assertEquals(3, names.size());
                assumeTrue(names instanceof List<String>);
            }

            @Test
            void 変更できるList() {
                var names = List.of("yamamoto", "kishida", "sugiyama");
                assertThrows(UnsupportedOperationException.class, () -> names.add("test"));
                var authors = new ArrayList<String>();
                authors.add("yamamoto");
                assertEquals("yamamoto", authors.get(0));
                authors.add("kishida");
                assertEquals("[yamamoto, kishida]", authors.toString());
                assertEquals(2, authors.size());
                authors.add("sugiyama");
                assertEquals(3, authors.size());
                authors.set(1, "naoki");
                assertEquals("[yamamoto, naoki, sugiyama]", authors.toString());
                assertThrows(IndexOutOfBoundsException.class, () -> authors.get(4));
                assertThrows(ArrayIndexOutOfBoundsException.class, () -> List.of().get(0));
            }

            @Test
            void ジェネリクスの型推論() {
                var names = List.of("yamamoto", "kishida", "sugiyama");
                var authors = new ArrayList<>(names);
                assertEquals("[yamamoto, kishida, sugiyama]", authors.toString());
            }
        }

        @Nested
        class 配列 {
            @Test
            void 配列の初期化() {
                var scores = new int[3];
                assertTrue(scores instanceof int[]);
                assertEquals(3, scores.length);
            }

            @Test
            void 要素を設定した配列の初期化() {
                var scores = new int[] { 1, 2, 3 };
                assertTrue(scores instanceof int[]);
                assertEquals(3, scores.length);
                assertEquals(1, scores[0]);
                assertEquals(2, scores[1]);
                assertEquals(3, scores[2]);
            }

            @Test
            void 配列の要素の利用() {
                var scores = new int[3];
                scores[1] = 85;
                assertEquals(85, scores[1]);
            }

            @Test
            void 多次元配列() {
                var mat = new int[2][3];
                mat[1][2] = 5;
                assertEquals(5, mat[1][2]);
                var mat2 = new int[][] { { 1, 2 }, { 3, 4, 5 } };
                assertEquals(3, mat2[1].length);
            }
        }

        @Nested
        class レコードで違う種類の値を組み合わせる {
            @Test
            void 違う種類の値をListでまとめて扱う() {
                var exam = List.of("kis", "math", 80);
                assertEquals("kis", exam.get(0));
                assertEquals(80, exam.get(2));
            }

            @Test
            void 違う種類の値をまとめて扱うレコードを定義する() {
                record Exame(String name, String subject, int score) {
                }
            }

            @Test
            void レコードのオブジェクトを生成する() {
                record Exame(String name, String subject, int score) {
                }
                var e1 = new Exame("kis", "math", 80);
                assertEquals("kis", e1.name);
                assertEquals(80, e1.score);
                assertEquals("KIS", e1.name.toUpperCase());
            }
        }

        @Nested
        class Mapで辞書を作る {
            @Test
            void Map_() {
                var fruits = Map.of("apple", "りんご", "grape", "ぶどう");
                assertEquals("ぶどう", fruits.get("grape"));
                assertNull(fruits.get("banana"));
                assertEquals("みつからない", fruits.getOrDefault("banana", "みつからない"));
                assertEquals(2, fruits.size());
                assertThrows(IllegalArgumentException.class, () -> Map.of("carot", "にんじん", "carot", "ニンジン"));
            }

            @Test
            void 変更可能なMap() {
                var animals = new HashMap<String, String>();
                animals.put("dog", "いぬ");
                animals.put("cat", "ねこ");
                assertEquals("ねこ", animals.get("cat"));
                assertNull(animals.get("fox"));
                animals.put("fox", "きつね");
                assertEquals("きつね", animals.get("fox"));
                animals.put("cat", "猫");
                assertEquals("猫", animals.get("cat"));
                assertEquals(3, animals.size());
            }
        }
    }

    @Nested
    class 繰り返し {
        @Nested
        class ループ構文 {
            @Test
            void for文の基本() {
                Function<String[], List<Object>> forState = (args) -> {
                    var array = new ArrayList<>();
                    for (int i = 0; i < 5; i++) {
                        array.add(i);
                    }
                    return array;
                };

                assertEquals(5, forState.apply(new String[0]).size());
            }

            @Test
            void for文の応用() {
                Function<Function<List<Object>, List<Object>>, List<Object>> forState = (loop) -> {
                    var array = new ArrayList<>();
                    return loop.apply(array);
                };

                Function<List<Object>, List<Object>> loop1 = (array) -> {
                    for (int i = 0; i < 5; i += 2) {
                        array.add(i);
                    }
                    return array;
                };

                Function<List<Object>, List<Object>> loop2 = (array) -> {
                    for (int i = 3; i > 0; i--) {
                        array.add(i);
                    }
                    return array;
                };

                assertEquals("[0, 2, 4]", forState.apply(loop1).toString());
                assertEquals("[3, 2, 1]", forState.apply(loop2).toString());
            }

            @Test
            void while文() {
                Function<String[], List<Object>> whileState = (args) -> {
                    var array = new ArrayList<>();
                    int i = 0;
                    while (i < 5) {
                        array.add(i);
                        i++;
                    }
                    return array;
                };

                assertEquals(5, whileState.apply(new String[0]).size());
            }

            @Test
            void ループのcontinueとbreak() {
                Function<String[], List<Object>> loopState = (args) -> {
                    var array = new ArrayList<>();
                    for (int i = 0; i < 5; i++) {
                        if (i == 2) {
                            array.add("skip");
                            continue;
                        }
                        array.add(i);
                    }
                    return array;
                };

                assertEquals("[0, 1, skip, 3, 4]", loopState.apply(new String[0]).toString());

                Function<String[], List<Object>> loopState2 = (args) -> {
                    var array = new ArrayList<>();
                    for (int i = 0; i < 5; i++) {
                        if (i == 2) {
                            array.add("finish");
                            break;
                        }
                        array.add(i);
                    }
                    return array;
                };

                assertEquals("[0, 1, finish]", loopState2.apply(new String[0]).toString());
            }
        }

        @Nested
        class ループになれる {
            @Test
            void デバッガーでループを覗く() {
                Function<String[], List<Object>> loopState = (args) -> {
                    var array = new ArrayList<>();
                    for (int i = 0; i < 5; i++) {
                        if (i != 2) {
                            array.add(i);
                            continue;
                        }
                        array.add("finish");
                        break;
                    }
                    return array;
                };

                assertEquals("[0, 1, finish]", loopState.apply(new String[0]).toString());
            }

            @Test
            void 二重ループ() {
                Function<String[], List<Object>> loopState = (args) -> {
                    var array = new ArrayList<>();
                    for (int i = 1; i <= 5; i++) {
                        for (int j = 1; j <= 9; j++) {
                            array.add(i * j);
                        }
                    }
                    return array;
                };

                assertEquals(
                        "[1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 4, 6, 8, 10, 12, 14, 16, 18, 3, 6, 9, 12, 15, 18, 21, 24, 27, 4, 8, 12, 16, 20, 24, 28, 32, 36, 5, 10, 15, 20, 25, 30, 35, 40, 45]",
                        loopState.apply(new String[0]).toString());

                Function<String[], List<Object>> loopState2 = (args) -> {
                    var array = new ArrayList<>();
                    for (int i = 1; i <= 5; i++) {
                        array.add("○".repeat(i));
                    }
                    return array;
                };

                assertEquals("[○, ○○, ○○○, ○○○○, ○○○○○]", loopState2.apply(new String[0]).toString());
            }

            @Test
            void もう少しループの練習() {

            }

            @Test
            void 迷路ゲームを作る() {
            }
        }
    }
}

interface CalcInterface {
    int div(int a, int b);
}

interface StateMentInterface {
    String main(String[] args);
}
