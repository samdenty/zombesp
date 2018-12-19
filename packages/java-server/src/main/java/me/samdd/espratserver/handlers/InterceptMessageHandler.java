package me.samdd.espratserver.handlers;

import io.moquette.interception.AbstractInterceptHandler;
import io.moquette.interception.messages.InterceptPublishMessage;

public class InterceptMessageHandler extends AbstractInterceptHandler {

    @Override
    public void onPublish(InterceptPublishMessage msg) {
        System.out.println(String.format("%s - %s - %s", msg.getClientID(), msg.getTopicName(), msg.getPayload()));
    }

    @Override
    public String getID() {
        return null;
    }
}
