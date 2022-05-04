package ape2022;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ape2022.HomeControler.TaskItem;

@RestController
public class HomeRestController {
  private List<TaskItem> taskItems = new ArrayList<>();

  private final TaskListDao dao;

  @Autowired
  HomeRestController(TaskListDao dao) {
    this.dao = dao;
  }

  @GetMapping("/restupdate")
  @CrossOrigin
  TaskItem updateItem(@RequestParam("id") String id, @RequestParam("task") String task,
      @RequestParam("deadline") String deadline, @RequestParam("done") boolean done) {
    TaskItem item = new TaskItem(id, task, deadline, done);
    dao.update(item);
    return item;
  }

  @GetMapping("/restdelete")
  @CrossOrigin
  String deleteItem(@RequestParam("id") String id) {
    dao.delete(id);

    return id;
  }

  @GetMapping("/restadd")
  @CrossOrigin
  TaskItem addItem(@RequestParam("task") String task, @RequestParam("deadline") String deadline) {
    String id = UUID.randomUUID().toString().substring(0, 8);
    TaskItem item = new TaskItem(id, task, deadline, false);
    dao.add(item);

    return item;
  }

  @GetMapping("/restlist")
  @CrossOrigin
  List<TaskItem> listitems() {
    List<TaskItem> taskItems = dao.findAll();
    return taskItems;
  }

  @RequestMapping(value = "/resthello")
  String hello() {
    return """
        	Hello.
        	It works!
        現在時刻は%sです。
        		""".formatted(LocalDateTime.now());
  }
}
