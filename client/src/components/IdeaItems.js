import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getIdeaById } from "../action/idea";
import { addComment } from "../action/solution";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItems from "./CommentItems";

const IdeaItems = ({
  match,
  getIdeaById,
  addComment,
  k: { tag = [], name, description, solution = [], user, date },
}) => {
  useEffect(() => {
    getIdeaById(match.params.id);
  }, null);

  return (
    <Fragment>
      <center style={{ width: "100%", background: "#f3f3f5" }}>
        <div
          style={{
            display: "none",
            fontSize: "1px",
            lineHeight: "1px",
            maxHeight: "0px",
            maxWidth: "0px",
            opacity: "0",
            overflow: "hidden",
            msoHide: "all",
            fontFamily: "sansSerif",
          }}
        >
          kkkkkkkkkppppppppp
        </div>

        <div
          class="email-container"
          style={{ maxWidth: "680px", margin: " 0 auto" }}
        >
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style={{ maxWidth: "680px", width: "100%" }}
          >
            <tr>
              <td
                style={{ padding: "20px 30px", textAlign: " left" }}
                class="sm-px"
              >
                <a href="https://stackoverflow.com/">
                  <img
                    src="Logo@2x.png"
                    alt="Stack Overflow logo."
                    border="0"
                    height="36"
                    width="146"
                    style={{
                      display: " block",
                      fontFamily: " arial, sansSerif",
                      fontSize: " 15px",
                      lineHeight: " 15px",
                      color: "#3C3F44",
                      margin: " 0",
                    }}
                  />
                </a>
              </td>
            </tr>

            <tr>
              <td
                style={{ padding: "30px", backgroundColor: "#ffffff" }}
                class="sm-p btr"
              >
                <div
                  dir="rtl"
                  style={{
                    display: "table",
                    width: "100%",
                    margin: "0 auto",
                    textAlign: "center",
                    fontSize: "0",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      margin: "0 -1px",
                      width: "128px",
                      verticalAlign: "top",
                    }}
                    class="stack-column"
                  >
                    <table
                      role="presentation"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      width="100%"
                    ></table>
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      margin: "0 -1px",
                      maxWidth: "492px",
                      minWidth: "220px",
                      verticalAlign: "top",
                    }}
                    class="stack-column"
                  >
                    <table
                      role="presentation"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      width="100%"
                    >
                      <tr>
                        <td dir="ltr" style={{ paddingBottom: "10px" }}>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                          >
                            <tr>
                              <td valign="top" width="19">
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  align="left"
                                >
                                  <tr>
                                    <td
                                      valign="middle"
                                      height="19"
                                      width="19"
                                      style={{
                                        fontFamily: "arial, sansSerif",
                                        fontSize: "13px",
                                        lineHeight: " 13px",
                                        color: " #ffffff",
                                        backgroundColor: "#EB5757",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        borderRadius: "3px",
                                      }}
                                    >
                                      S
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td
                                valign="middle"
                                style={{
                                  paddingLeft: "5px",
                                  fontFamily: " arial, sansSerif",
                                  fontSize: "13px",
                                  lineHeight: " 13px",
                                  color: " #242729",
                                  textAlign: " left;",
                                }}
                              >
                                SO for Teams Name
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td
                          dir="ltr"
                          style={{
                            fontFamily: "arial, sansSerif",
                            fontSize: "15px",
                            lineHeight: "140%",
                            color: "#3C3F44",
                            textAlign: "left",
                            paddingRight: "30px",
                          }}
                        >
                          <h1
                            style={{
                              fontWeight: "bold",
                              fontSize: "27px",
                              lineHeight: "27px",
                              color: "#0C0D0E",
                              margin: "0 0 15px 0",
                            }}
                          >
                            {name}
                          </h1>
                          <p style={{ margin: "0" }} class="has-markdown">
                            {description}
                            gjgugkhilhilglgugkgkgggggggggggggggggggggggggggggggggg
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td
                          valign="top"
                          style={{
                            paddingBottom: "20px",
                            paddingTop: "20px",
                            lineHeight: "100%",
                          }}
                        >
                          {tag.map((tags, index) => (
                            <a
                              href="#"
                              style={{
                                display: "inline-block",
                                border: "5px solid #E1ECF4",
                                margin: "0 1px 4px 0",
                                background: "#E1ECF4",
                                borderRadius: "3px",
                                color: "#39739D",
                                fontFamily: "arial, sansSerif",
                                fontSize: "12px",
                                lineHeight: "100%",
                                textDecoration: "none",
                                whiteSpace: "nowrap",
                              }}
                              class="s-tag"
                              key={index}
                            >
                              {tags}
                            </a>
                          ))}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td
                style={{ padding: " 0 30px 30px", backgroundColor: "#ffffff" }}
                class="sm-px sm-pb bbr"
              >
                <table
                  width="100%"
                  align="left"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                >
                  <tr>
                    <td
                      style={{
                        padding: "30px 0 15px",
                        fontFamily: "arial, sansSerif",
                        fontSize: "15px",
                        lineHeight: "140%",
                        color: "#3C3F44",
                        textAlign: "left",
                        borderTop: "1px solid #E0E0E0",
                      }}
                      class="sm-pt"
                    ></td>
                  </tr>

                  <tr>
                    <td>
                      <table
                        align="left"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                      >
                        <tr>
                          <td
                            class="s-btn s-btn__primary"
                            style={{
                              borderRadius: "4px",
                              background: " #0095ff",
                            }}
                          >
                            <Link
                              class="s-btn s-btn__primary"
                              to={`/solutionPost/${match.params.id}`}
                              style={{
                                background: "#0095FF",
                                border: "1px solid #0077cc",
                                boxShadow:
                                  "inset 0 1px 0 0 rgba(102,191,255,.75)",
                                fontFamily: "arial, sansSerif",
                                fontSize: "17px",
                                lineHeight: " 17px",
                                color: " #ffffff",
                                textAlign: "center",
                                textDecoration: "none",
                                padding: "13px 17px",
                                display: "block",
                                borderRadius: "4px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Post Solution
                            </Link>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td
                aria-hidden="true"
                height="30"
                style={{ fontSize: "0px", lineHeight: " 0px" }}
              >
                &nbsp;
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: "30px 30px 10px",
                  backgroundColor: "#ffffff",
                  textAlign: "left",
                }}
                class="sm-px sm-pt bar"
              >
                <table
                  width="100%"
                  align="left"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                >
                  <tr>
                    <td
                      style={{
                        fontFamily: "arial, sansSerif",
                        fontSize: "15px",
                        lineHeight: "140%",
                        color: "#3C3F44",
                        textAlign: "left",
                      }}
                    >
                      <p style={{ margin: "0 0 15px" }}>
                        <h1
                          style={{
                            fontWeight: "bold",
                            fontSize: "27px",
                            lineHeight: "27px",
                            color: "#0C0D0E",
                            margin: "0 0 15px 0",
                          }}
                        >
                          Solutions
                        </h1>
                      </p>
                    </td>
                  </tr>

                  {solution.map((solu) => (
                    <tr>
                      <td
                        style={{
                          paddingTop: "20px",
                          borderTop: "1px solid #D6D8DB",
                        }}
                        class="sm-pt"
                      >
                        <table
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          width="100%"
                          role="presentation"
                        >
                          <tr>
                            <td style={{ verticalAlign: "top", width: "20px" }}>
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                align="left"
                              ></table>
                            </td>
                            <td
                              style={{
                                verticalAlign: "top",
                                paddingLeft: "10px",
                              }}
                            >
                              <table
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                                width="100%"
                                role="presentation"
                              >
                                <tr>
                                  <td style={{ paddingBottom: "5px" }}>
                                    <a
                                      href="#"
                                      style={{
                                        fontSize: "17px",
                                        lineHeight: " 21px",
                                        fontFamily: " arial, sansSerif",
                                        color: "#0077CC",
                                        textDecoration: "none",
                                      }}
                                    >
                                      How different are “Top spot” and
                                      “Standard” listings?
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ paddingBottom: "15px" }}>
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      border="0"
                                      align="left"
                                    >
                                      <tr>
                                        <td
                                          style={{
                                            paddingRight: "5px",
                                            verticalAlign: "top",
                                          }}
                                        >
                                          <img
                                            src="https://www.gravatar.com/avatar/ba2048541a79d22d6892f54c9298a717?s=32&d=identicon&r=PG"
                                            alt=""
                                            height="16"
                                            width="16"
                                            align="left"
                                            border="0"
                                            style={{ display: "block" }}
                                          />
                                        </td>
                                        <td
                                          style={{
                                            verticalAlign: "top",
                                            paddingTop: "3px",
                                            fontFamily: "arial, sansSerif",
                                            fontSize: "12px",
                                            lineHeight: " 12px",
                                            color: "#828282",
                                          }}
                                        >
                                          Thomas A. Limoncelli provided {date}
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      paddingBottom: " 10px",
                                      fontSize: "20px",
                                      lineHeight: " 17px",
                                      fontFamily: "arial, sansSerif",
                                      color: " #54595f",
                                    }}
                                  >
                                    {solu.description}
                                    <br />
                                    <a href={solu.links}>{solu.links}</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      paddingBottom: " 10px",
                                      fontSize: "13px",
                                      lineHeight: " 17px",
                                      fontFamily: "arial, sansSerif",
                                      color: " #54595f",
                                    }}
                                  >
                                    {solu.comments.map((comment) => (
                                      <CommentItems
                                        key={comment._id}
                                        comment={comment}
                                        solutionId={solu._id}
                                      />
                                    ))}

                                    <CommentForm solutionId={solu._id} />
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  ))}
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </Fragment>
  );
};

IdeaItems.propTypes = {
  getIdeaById: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  k: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  k: state.idea.k,
});

export default connect(mapStateToProps, { getIdeaById, addComment })(IdeaItems);
