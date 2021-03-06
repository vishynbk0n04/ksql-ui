package controllers

import javax.inject.{ Inject, Singleton }

import actors.QueryKsqlActor
import akka.actor.ActorSystem
import akka.stream.Materializer
import play.api.libs.json.JsValue
import play.api.libs.streams.ActorFlow
import play.api.mvc._

/**
  * Handle queries sent by the user.
  * Uses websockets!
  */
@Singleton
class QueryController @Inject()(cc: ControllerComponents)(implicit system: ActorSystem, mat: Materializer)
  extends AbstractController(cc) {

  // TODO: make this use typed request / response types
  def query() = WebSocket.accept[JsValue, JsValue] { request =>
    ActorFlow.actorRef { out =>
      QueryKsqlActor.props(out, sys.env.getOrElse("KSQL_API_SERVER", "http://localhost:8080"))
    }
  }
}
