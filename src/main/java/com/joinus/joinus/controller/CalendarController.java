package com.joinus.joinus.controller;

import com.joinus.joinus.domain.Calendar;
import com.joinus.joinus.dto.Response;
import com.joinus.joinus.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;

    @GetMapping("/list")
    public Response getList(@RequestParam Long teamId){
        Response response = new Response();
        response.setData(calendarService.getList(teamId));
        response.setRedirect("/calendar");

        return response;
    }

    @PostMapping("/create")
    public Response create(@RequestBody Calendar calendar, @RequestParam Long teamId){
        calendar.setTeamId(teamId);
        calendarService.create(calendar);

        Response response = new Response();
        response.setData("success");
        response.setRedirect("/calendar");

        return response;
    }

    @PostMapping("/delete")
    public Response delete(@RequestParam Long calendarId){
        calendarService.delete((calendarId));

        Response response = new Response();
        response.setData("success");
        response.setRedirect("/calendar");

        return response;
    }
}
