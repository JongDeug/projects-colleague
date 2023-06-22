package com.joinus.joinus.controller;

import com.joinus.joinus.domain.MeetingMinutes;
import com.joinus.joinus.dto.Response;
import com.joinus.joinus.service.MeetingMinutesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/minutes")
@RequiredArgsConstructor
@Slf4j
public class MinutesController {
    private final MeetingMinutesService meetingMinutesService;

    @GetMapping("/list")
    public Response getListByTeamId(@RequestParam Long teamId){
        Response response = new Response();
        response.setData(meetingMinutesService.findMinutesList(teamId));
        response.setRedirect("/");

        return response;
    }

    @GetMapping("/detail")
    public Response getDetail(@RequestParam Long minutesId){
        Response response = new Response();
        response.setData(meetingMinutesService.getMinutes(minutesId));
        response.setRedirect("/");

        return response;
    }

    @PostMapping("/create")
    public Response create(@RequestBody MeetingMinutes minutes){
        Response response = new Response();
//        log.info("info={}", minutes);
        meetingMinutesService.makeMinutes(minutes);
        response.setData("success");
        response.setRedirect("/");

        return response;
    }

    @PostMapping("/update")
    public Response update(@RequestBody MeetingMinutes minutes){
        Response response = new Response();
        meetingMinutesService.updateMinutes(minutes);
        response.setData("success");
        response.setRedirect("/");

        return response;
    }

    @PostMapping("/delete")
    public Response delete(@RequestParam Long minutesId){
        Response response = new Response();
        meetingMinutesService.deleteMinutes(minutesId);
        response.setData("success");
        response.setRedirect("/");

        return response;
    }

    @GetMapping("/search")
    public Response search(@RequestParam String text){
        Response response = new Response();
        response.setData(meetingMinutesService.search(text));
        response.setRedirect("/");

        return response;
    }
}
