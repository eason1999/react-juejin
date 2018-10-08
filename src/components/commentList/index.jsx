import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { timeFormat } from '../../utils'
import './style.styl'

export default class CommentList extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired
    }

    componentDidMount() {}

    getComposeText(str, ...args) {
        return args.reduce((res, item) => {
            item && res.push(item)
            return res
        }, []).join(str)
    }

    render() {
        const { list } = this.props

        return (
            <ul styleName="comment-list">
                {
                    list.map(item => (
                        <li key={item.id} styleName="item">
                            <Link to={`/user/${item.userInfo.objectId}`}>
                                <div styleName="avatar" style={{ backgroundImage: `url(${item.userInfo.avatarLarge})` }} />
                            </Link>
                            <div styleName="body">
                                <div styleName="info">
                                    <Link to={`/user/${item.userInfo.objectId}`} styleName="username">{item.userInfo.username}</Link>
                                    <span styleName="position">
                                        {this.getComposeText(' @ ', item.userInfo.jobTitle, item.userInfo.company)}
                                    </span>
                                </div>
                                <div styleName="comment">{item.content}</div>
                                <div styleName="other-info">
                                    <div styleName="time">{timeFormat(item.createdAt)}</div>
                                    <div styleName="action-box">
                                        <div styleName="action-item">
                                            <i className="iconfont">&#xe600;</i>
                                            {!!item.likesCount && <span>{item.likesCount}</span>}
                                        </div>
                                        <div styleName="action-item">
                                            <i className="iconfont" styleName="reply-icon">&#xe662;</i>
                                            <span>回复</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        )
    }
}
